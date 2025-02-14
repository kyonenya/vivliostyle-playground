// import { reviveParse } from '@vivliostyle/vfm/lib/revive-parse.js';
import { reviveRehype } from '@vivliostyle/vfm/lib/revive-rehype.js';
import unified from 'unified';
import rehypeStringify from 'rehype-stringify';
import breaks from 'remark-breaks';
import frontmatter from 'remark-frontmatter';
import markdown from 'remark-parse';
// import { mdast as attr } from './plugins/attr.js';
import { mdast as attr } from '@vivliostyle/vfm/lib/plugins/attr.js';
import { mdast as code } from '@vivliostyle/vfm/lib/plugins/code.js';
import { mdast as footnotes } from '@vivliostyle/vfm/lib/plugins/footnotes.js';
import { mdast as math } from '@vivliostyle/vfm/lib/plugins/math.js';
import { mdast as ruby } from '@vivliostyle/vfm/lib/plugins/ruby.js';
import { mdast as section } from '@vivliostyle/vfm/lib/plugins/section.js';
import { mdast as slug } from '@vivliostyle/vfm/lib/plugins/slug.js';
import { mdast as toc } from '@vivliostyle/vfm/lib/plugins/toc.js';
import { inspect } from '@vivliostyle/vfm/lib/utils.js';
import { mdast as doc } from '@vivliostyle/vfm/lib/plugins/document.js';
import rehypeFormat from 'rehype-format';
/**
 * Create Markdown AST parsers.
 * @param hardLineBreaks Add `<br>` at the position of hard line breaks, without needing spaces..
 * @param enableMath Enable math syntax.
 * @returns Parsers.
 */
export const reviveParse = (hardLineBreaks, enableMath) => [
  [markdown, { gfm: true, commonmark: true }],
  ...(hardLineBreaks ? [breaks] : []),
  ...(enableMath ? [math] : []),
  ruby,
  // footnotes,
  attr,
  slug,
  section,
  code,
  toc,
  frontmatter,
  inspect('mdast'),
];

const checkMetadata = (metadata, options) => {
  if (metadata.title === undefined && options.title !== undefined) {
    metadata.title = options.title;
  }

  if (metadata.lang === undefined && options.language !== undefined) {
    metadata.lang = options.language;
  }

  if (options.style) {
    if (metadata.link === undefined) {
      metadata.link = [];
    }

    if (typeof options.style === 'string') {
      metadata.link.push([
        { name: 'rel', value: 'stylesheet' },
        { name: 'type', value: 'text/css' },
        { name: 'href', value: options.style },
      ]);
    } else if (Array.isArray(options.style)) {
      for (const style of options.style) {
        metadata.link.push([
          { name: 'rel', value: 'stylesheet' },
          { name: 'type', value: 'text/css' },
          { name: 'href', value: style },
        ]);
      }
    }
  }
};

/**
 * Create Unified processor for Markdown AST and Hypertext AST.
 * @param options Options.
 * @returns Unified processor.
 */
export function VFM(
  {
    style = undefined,
    partial = false,
    title = undefined,
    language = undefined,
    replace = undefined,
    hardLineBreaks = false,
    disableFormatHtml = false,
    math = true,
  } = {},
  metadata = {}
) {
  checkMetadata(metadata, { style, title, language });

  // Prioritize metadata `vfm` settings over options
  if (metadata.vfm) {
    if (metadata.vfm.math !== undefined) {
      math = metadata.vfm.math;
    }
    if (metadata.vfm.partial !== undefined) {
      partial = metadata.vfm.partial;
    }
    if (metadata.vfm.hardLineBreaks !== undefined) {
      hardLineBreaks = metadata.vfm.hardLineBreaks;
    }
    if (metadata.vfm.disableFormatHtml !== undefined) {
      disableFormatHtml = metadata.vfm.disableFormatHtml;
    }
  }

  const processor = unified()
    .use(reviveParse(hardLineBreaks, math))
    .data('settings', { position: true })
    .use(reviveRehype);

  if (replace) {
    processor.use(handleReplace, { rules: replace });
  }

  if (!partial) {
    processor.use(doc, metadata);
  }

  processor.use(rehypeStringify);

  // Must be run after `rehype-document` to write to `<head>`
  // if (math) {
  //   processor.use(hastMath);
  // }

  // Explicitly specify true if want unformatted HTML during development or debug
  if (!disableFormatHtml) {
    processor.use(rehypeFormat);
  }

  return processor;
}

/** VFM の documentProcessor に適用 */
export const documentProcessor = (config, metadata) => VFM(config, metadata);

export default {
  title: '吾輩は猫である。', // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: 'kyonenya <kyonenya.takashi@gmail.com>', // default to `author` in `package.json` or undefined.
  // language: 'ja', // default to undefined.
  size: 'B6', // paper size.
  theme: ['@vivliostyle/theme-bunko@^2.0.0', 'themes/custom.css'], // .css or local dir or npm package. default to undefined.
  entry: [
    'manuscript.md', // `title` is automatically guessed from the file (frontmatter > first heading).
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set individually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  // entryContext: './manuscripts', // default to '.' (relative to `vivliostyle.config.js`).
  // output: [ // path to generate draft file(s). default to '{title}.pdf'
  //   './output.pdf', // the output format will be inferred from the name.
  //   {
  //     path: './book',
  //     format: 'webpub',
  //   },
  // ],
  workspaceDir: '.vivliostyle', // directory which is saved intermediate files.
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
  documentProcessor,
};
