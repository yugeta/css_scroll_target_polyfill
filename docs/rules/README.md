# コーディングルール

このプロジェクトのコーディング規約をまとめたドキュメントです。

## ドキュメント一覧

- [JavaScript コーディングルール](javascript.md)
- [HTML コーディングルール](html.md)
- [CSS コーディングルール](css.md)

## 共通原則

### 一貫性
- プロジェクト全体で統一されたスタイルを維持
- 既存のコードスタイルに従う

### 可読性
- 意味のある名前を使用
- 適切なインデントと空白を使用
- 必要に応じてコメントを追加

### シンプルさ
- 複雑な処理は分割
- 早期リターンで処理を簡潔に
- 不要な処理は避ける

### モジュール性
- 機能ごとにファイルを分割
- 再利用可能なコードを作成
- 依存関係を明確にする

## 命名規則まとめ

| 対象 | 規則 | 例 |
|------|------|-----|
| JavaScriptファイル | 小文字、スネークケース | `main.js`, `css.js` |
| JavaScriptクラス | パスカルケース | `Main`, `Css`, `Observer` |
| JavaScriptメソッド | スネークケース | `get_style_value()`, `set_targets()` |
| JavaScript変数 | スネークケース | `base_url`, `link_target` |
| HTMLファイル | 小文字、ハイフン区切り | `index.html` |
| HTML ID | 小文字、数字 | `section1`, `section2` |
| HTML クラス | BEM記法 | `.section`, `.section__title` |
| CSSファイル | 小文字、ハイフン区切り | `style.css`, `base.css` |
| CSSクラス | BEM記法 | `.sidebar`, `.section__title` |
| CSS変数 | ケバブケース | `--color-border` |

## インデント

すべてのファイルで2スペースを使用します。

## コメント

### JavaScript
```javascript
// 処理の説明
async get_style_value(){
  // ...
}
```

### HTML
```html
<!-- 一時的な無効化 -->
<!-- <link rel="stylesheet" href="css/base.css"> -->
```

### CSS
```css
/* スクロール通過ずみ: 薄いグレー */
a:target-before {
  color: #999;
}
```

## ファイル構成

```
project/
├── src/
│   └── js/
│       ├── main.js       # エントリーポイント
│       ├── css.js        # CSS処理
│       ├── observer.js   # 監視処理
│       └── util.js       # 共通機能
├── sample/
│   ├── blog/
│   │   ├── css/
│   │   │   ├── base.css
│   │   │   └── style.css
│   │   └── index.html
│   └── test/
│       ├── css/
│       │   ├── base.css
│       │   ├── style.css
│       │   └── target.css
│       └── index.html
└── docs/
    ├── README.md
    ├── API.md
    ├── ARCHITECTURE.md
    └── rules/
        ├── README.md
        ├── javascript.md
        ├── html.md
        └── css.md
```

## ツール

### 推奨エディタ設定
- インデント: 2スペース
- 文字コード: UTF-8
- 改行コード: LF
- 末尾の空白: 削除

## 参考

各言語の詳細なルールは、個別のドキュメントを参照してください。
