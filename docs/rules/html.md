# HTML コーディングルール

## ドキュメント構造

### DOCTYPE宣言
- HTML5のDOCTYPE宣言を使用

```html
<!DOCTYPE html>
```

### 言語設定
- `lang` 属性で言語を明示

```html
<html lang="ja">
```

### 文字コード
- UTF-8を使用
- `<head>` の最初に記述

```html
<meta charset="UTF-8">
```

### ビューポート
- レスポンシブデザインのためのメタタグを設定

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## インデント

### スペース
- 2スペースでインデント
- ネストごとに1段階インデント

```html
<body>
  <aside class="sidebar">
    <ol class="list">
      <li><a href="#section1">目次1</a></li>
    </ol>
  </aside>
</body>
```

## 要素の使用

### セマンティックHTML
- 意味のある要素を使用
- `<aside>`: サイドバー
- `<main>`: メインコンテンツ
- `<section>`: セクション
- `<ol>`: 順序付きリスト

```html
<aside class="sidebar">
  <!-- サイドバーコンテンツ -->
</aside>

<main class="main">
  <!-- メインコンテンツ -->
</main>
```

### ID属性
- アンカーリンクのターゲットに使用
- 小文字で記述
- 意味のある名前を使用

```html
<section id="section1" class="section">
```

### クラス属性
- BEM記法を使用
- ブロック: `.block`
- エレメント: `.block__element`
- モディファイア: `.block--modifier`

```html
<section class="section">
  <h2 class="section__title">目次1</h2>
</section>
```

## リンク

### アンカーリンク
- `href` 属性にハッシュを指定
- 対応する `id` を持つ要素にリンク

```html
<a href="#section1">目次1</a>
```

## スクリプト

### モジュールスクリプト
- `type="module"` を指定
- 相対パスで記述

```html
<script type="module" src="../../src/js/main.js"></script>
```

### 配置
- `<head>` 内に記述
- CSSの後に配置

## スタイルシート

### 外部CSS
- `<link>` タグで読み込み
- 複数のCSSファイルは順序を考慮

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/style.css">
```

### 配置順序
1. ベースCSS（リセット、共通スタイル）
2. コンポーネントCSS

## コメント

### HTMLコメント
- 必要に応じて使用
- 開発時の一時的な無効化に使用

```html
<!-- <link rel="stylesheet" href="css/base.css"> -->
```

## 空白行

### セクション間
- 主要なセクション間に空白行を入れない
- 読みやすさを優先

```html
<body>
  <aside class="sidebar">
    <ol class="list">
      <li><a href="#section1">目次1</a></li>
      <li><a href="#section2">目次2</a></li>
      <li><a href="#section3">目次3</a></li>
    </ol>
  </aside>

  <main class="main">
    <section id="section1" class="section">
      <h2 class="section__title">目次1</h2>
      <p>目次1の内容です。</p>
    </section>

    <section id="section2" class="section">
      <h2 class="section__title">目次2</h2>
      <p>目次2の内容です。</p>
    </section>
  </main>
</body>
```

## 属性の順序

### 推奨順序
1. `id`
2. `class`
3. `href`, `src`
4. その他の属性

```html
<a class="target-current" href="#section2">目次2</a>
```

## アクセシビリティ

### 見出し
- 適切な見出しレベルを使用
- `<h1>` はページタイトル、`<h2>` はセクションタイトル

```html
<h2 class="section__title">目次1</h2>
```

### リスト
- 順序が重要な場合は `<ol>`
- 順序が重要でない場合は `<ul>`

```html
<ol class="list">
  <li><a href="#section1">目次1</a></li>
  <li><a href="#section2">目次2</a></li>
</ol>
```

## ファイル構成

### ディレクトリ構造
```
sample/
  ├── blog/
  │   ├── css/
  │   │   ├── base.css
  │   │   └── style.css
  │   └── index.html
  └── test/
      ├── css/
      │   ├── base.css
      │   ├── style.css
      │   └── target.css
      └── index.html
```

### 命名規則
- ディレクトリ名: 小文字、ハイフン区切り
- ファイル名: 小文字、ハイフン区切り
