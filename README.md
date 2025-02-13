# vivliostyle-playground

- remarkプラグインの作り方：[Remark で広げる Markdown の世界](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html)
- 目次は深さ `sectionDepth` も指定できるようになったらしい：[examples/table-of-contents](https://github.com/vivliostyle/vivliostyle-cli/tree/main/examples/table-of-contents)
  - →だとこの目的のために目次生成スクリプト組んでるけどアップデートで不要になったらしい：[技術書典13の執筆環境にVivliostyleを採用しました](https://zenn.dev/typebase_dev/articles/techbookfest13-vivliostyle#1.-%E7%9B%AE%E6%AC%A1%E3%81%8C%E3%81%84%E3%81%84%E6%84%9F%E3%81%98%E3%81%AB%E7%94%9F%E6%88%90%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84)
- 実装例がたくさん載ってる examples：[vivliostyle-cli/examples · vivliostyle/vivliostyle-cli](https://github.com/vivliostyle/vivliostyle-cli/tree/main/examples)
- すげえ……任意のMarkdownパーサーを渡せる機能：[Vivliostyle (v8.16.0+) で mermaid.js の図を表示する](https://zenn.dev/mura_mi/articles/4f08cc99f19887)
  - > vivliostyle-cli の設定ファイルに unified プロセッサーの生成ロジックを記載すれば、VFM ではなく自らが指定したプロセッサーに差し替えて利用することができる
  - > package.json で "type": "module" を指定するのをお忘れなく
  - 実装例：[examples/customize-processor/vivliostyle.config.js](https://github.com/vivliostyle/vivliostyle-cli/blob/main/examples/customize-processor/vivliostyle.config.js)
- 奥付と改ページhrのやり方：[Vivliostyle: 技術同人誌をつくって入稿用PDFをビルドする（後編）](https://zenn.dev/sky_y/articles/markdown-advent-2020-vivliostyle4)
- 複数ファイルや奥付の公式説明：[Create Book | docs.vivliostyle.org](https://docs.vivliostyle.org/ja/create-book.html)
  - > なお、HTMLのタグがある行とmarkdownの行の間には、必ず空行をいれるよう注意してください。そうしないとエラーになります。
- Actionsのワークフロー：[vivliostyle/action: 🔌 A github action for publication workflow](https://github.com/vivliostyle/action)
  - 古くて動作しない
- Vivliostyle CLIのドキュメント：[vivliostyle-cli/docs/ja/index.md at main · vivliostyle/vivliostyle-cli](https://github.com/vivliostyle/vivliostyle-cli/blob/main/docs/ja/index.md)
- CSS変数一覧：[themes/packages/@vivliostyle/theme-base/css/partial/page.css at main · vivliostyle/themes](https://github.com/vivliostyle/themes/blob/main/packages/%40vivliostyle/theme-base/css/partial/page.css)
- 使えるHTMLタグ一覧：[themes/packages/@vivliostyle/theme-base/css/common/basic.css at main · vivliostyle/themes](https://github.com/vivliostyle/themes/blob/main/packages/%40vivliostyle/theme-base/css/common/basic.css)
- endnoteの生スタイル：[theme-base/css/partial/endnote.css ](https://github.com/vivliostyle/themes/blob/main/packages/%40vivliostyle/theme-base/css/partial/endnote.css)
- footnoteのスタイル参考：[theme-techbook/theme.css](https://github.com/vivliostyle/themes/blob/main/packages/%40vivliostyle/theme-techbook/theme.css)
- 閲覧用：[theme-bunko/theme.css](https://github.com/vivliostyle/themes/blob/main/packages/%40vivliostyle/theme-bunko/theme.css)
- スタイルを自分で編集：[新しくなった Vivliostyle Themes のカスタムテーマを公開する](https://zenn.dev/macneko/articles/e08dcfaef8e6b0)
  - [公式チュートリアル](https://vivliostyle.org/ja/tutorials/)の情報が古い
- ローカルのフォントファイル：[Vivliostyle でテーマのフォントを変更する #技術書典 - Qiita](https://qiita.com/mitsuharu_e/items/9bf2b7eee2767aee2613)
  - フォント埋め込みtheme：[vivliostyle-theme-noto-sans-jp/fonts at main · mitsuharu/vivliostyle-theme-noto-sans-jp](https://github.com/mitsuharu/vivliostyle-theme-noto-sans-jp/tree/main/fonts)

### フォント埋め込みエラーには文字のアウトライン化で対処する

- press-readyの罠：入力ファイル名を日本語にしてはいけない：[Vivliostyle: 技術同人誌をつくって入稿用PDFをビルドする（後編）](https://zenn.dev/sky_y/articles/markdown-advent-2020-vivliostyle4#press-ready%E3%81%AE%E7%BD%A0%EF%BC%9A%E5%85%A5%E5%8A%9B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E5%90%8D%E3%82%92%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%81%AB%E3%81%97%E3%81%A6%E3%81%AF%E3%81%84%E3%81%91%E3%81%AA%E3%81%84)
- [印刷用 PDF（PDF/X-1a 形式）の生成](https://github.com/vivliostyle/vivliostyle-cli/blob/main/docs/ja/special-output-settings.md#%E5%8D%B0%E5%88%B7%E7%94%A8-pdfpdfx-1a-%E5%BD%A2%E5%BC%8F%E3%81%AE%E7%94%9F%E6%88%90)
  - > 後処理のみ Docker 上で実行します
  - `preflightOption: ['gray-scale', 'enforce-outline'],`
    - [vivliostyle-cli/examples/preflight/vivliostyle.config.js at main · vivliostyle/vivliostyle-cli](https://github.com/vivliostyle/vivliostyle-cli/blob/main/examples/preflight/vivliostyle.config.js)
  - 元ライブラリのオプション：[Options - vibranthq/press-ready: 🚀 Make your PDF press-ready PDF/X-1a.](https://github.com/vibranthq/press-ready?tab=readme-ov-file#options)
-  このパッケージで印刷用にしてるらしい：[vibranthq/press-ready: 🚀 Make your PDF press-ready PDF/X-1a.](https://github.com/vibranthq/press-ready)
  - `apt-get install poppler-utils ghostscript`
- CLIドキュメント。Dockerを使ってレンダリングするらしい：[vivliostyle-cli/docs/ja/special-output-settings.md at main · vivliostyle/vivliostyle-cli](https://github.com/vivliostyle/vivliostyle-cli/blob/main/docs/ja/special-output-settings.md#%E5%8D%B0%E5%88%B7%E7%94%A8-pdfpdfx-1a-%E5%BD%A2%E5%BC%8F%E3%81%AE%E7%94%9F%E6%88%90)
- `-p, --press-ready`：[vivliostyle/vivliostyle-cli: ⚒ Supercharge command-line publication workflow.](https://github.com/vivliostyle/vivliostyle-cli)
  - > 生成されたPDFをプレスレディPDF/X-1aと互換にする [デフォルト：false] 。このオプションは "--preflight press-ready" と同等です。
- え！？：[Type3 の代わりに CID を使用してください · Issue #437 · vivliostyle/vivliostyle.js](https://github.com/vivliostyle/vivliostyle.js/issues/437)
  - > この問題は、[Vivliostyle CLI ](https://github.com/vivliostyle/vivliostyle-cli)--press-readyオプションによってすでに解決されています。
- [Ghostscript (> 9.15) を使って PDF 中の文字列をアウトライン化する | Atusy's blog](https://blog.atusy.net/2019/05/23/outline-pdf-glyphs-by-gs/)
- Ghostscriptガチ勢：[Ghostscript のこと(3)：新しいアウトライン化の知見 - Acetaminophen’s diary](https://acetaminophen.hatenablog.com/entry/2015/03/14/221359)
- Vivliostyle側も問題を認識済：[Vivliostyle のこれからの開発課題](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/shinyu/index.html)
- [生成した PDF の印刷所入稿 — Re:VIEW knowledge ドキュメント](https://review-knowledge-ja.readthedocs.io/ja/latest/printing/submit.html#71533ec87c26e13f448c6bf22d8ef91b)
  - > Chrome ブラウザから生成した PDF では、OpenType フォントを使っている文字は（不適切な）Type3 形式になります。TrueType フォントの場合は CID 形式になるようです。Type3 形式の文字は、印刷の面では描画品質が低い・PDF 処理をする印刷機では異常なエラーを起こすことがあるために利用できない〔…〕
- T3フォント埋め込みエラー：[PDFのフォント埋め込み（T3フォント）問題に苦労した話 | Shikoan's ML Blog](https://blog.shikoan.com/pdf-font-embed/)
- 第一発見者：[CSS組版の光と闇 - ふぃーるどのーつ](https://blog.fieldnotes.jp/entry/css-layouting)
