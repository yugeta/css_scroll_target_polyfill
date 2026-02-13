# CSS コーディングルール

## ファイル構成

### インポート
- `@import` を使用してCSSを分割
- ベースCSSを最初にインポート

```css
@import "base.css";
@import "target.css";
```

### ファイル分割
- `base.css`: リセット、共通スタイル
- `style.css`: コンポーネント固有のスタイル
- `target.css`: target疑似クラスのスタイル

## セレクタ

### クラス命名規則
- BEM記法を使用
- ブロック: `.block`
- エレメント: `.block__element`
- モディファイア: `.block--modifier`

```css
.section {
  /* ブロック */
}

.section__title {
  /* エレメント */
}
```

### セレクタの記述
- 小文字で記述
- ハイフンで単語を区切る

```css
.sidebar {
  /* ... */
}

.color-border {
  /* ... */
}
```

## プロパティ

### 記述順序
1. 表示・配置（display, position, top, left, etc.）
2. ボックスモデル（width, height, margin, padding, border）
3. フォント（font-size, font-weight, color）
4. その他（background, etc.）

```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 100vh;
  padding: 24px;
  border-right: 1px solid var(--color-border);
}
```

### インデント
- 2スペース
- プロパティは1行に1つ

```css
.list {
  display: grid;
  gap: 12px;
}
```

### セミコロン
- すべてのプロパティの末尾に記述

```css
.section {
  min-height: 100vh;
  padding: 40px;
}
```

## 値の記述

### 単位
- `px`: 固定サイズ
- `vh`: ビューポート高さ
- 単位なし: `0` の場合

```css
width: 150px;
height: 100vh;
top: 0;
```

### カラー
- 16進数表記を使用
- 3桁または6桁
- CSS変数も使用可能

```css
color: #999;
color: #0066cc;
border-right: 1px solid var(--color-border);
```

### スペース
- コロンの後にスペースを1つ
- カンマの後にスペースを1つ

```css
padding: 24px;
border-right: 1px solid var(--color-border);
```

## レイアウト

### Flexbox
- モダンなレイアウトに使用

```css
body {
  display: flex;
  justify-content: flex-start;
}
```

### Grid
- リスト表示に使用
- `gap` でアイテム間の余白を指定

```css
.list {
  display: grid;
  gap: 12px;
}
```

### Position
- `fixed`: 固定配置（サイドバーなど）
- 位置指定は `top`, `left` などで明示

```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
```

## Target疑似クラス

### 基本構造
- `:target-before`: スクロール通過済み
- `:target-current`: 現在表示中
- `:target-after`: スクロール未到達

```css
/* スクロール通過ずみ: 薄いグレー */
a:target-before {
  color: #999;
}

/* 現在表示中: 強調表示 */
a:target-current {
  color: #0066cc;
  font-weight: bold;
}

/* スクロール未到達: 濃いグレー */
a:target-after {
  color: #333;
}
```

### ネストセレクタ
- 親要素内でネストして記述可能

```css
.list {
  scroll-target-group: auto;
  display: grid;
  gap: 12px;

  a:target-before {
    color: #999;
  }

  a:target-current {
    color: #0066cc;
    font-weight: bold;
  }

  a:target-after {
    color: #333;
  }
}
```

## コメント

### セクションコメント
- 処理の説明を記述
- 日本語で簡潔に

```css
/* スクロール通過ずみ: 薄いグレー */
a:target-before {
  color: #999;
}
```

### ブロックコメント
- 複数行のコメントは使用しない
- 1行コメントを使用

## CSS変数

### カスタムプロパティ
- `--` で始まる名前
- ケバブケースで記述

```css
border-right: 1px solid var(--color-border);
```

## 特殊プロパティ

### scroll-target-group
- target疑似クラスのグループ化に使用

```css
.list {
  scroll-target-group: auto;
}
```

## 空白行

### ルールセット間
- ルールセット間に空白行を入れない
- コメントの前後に空白行を入れない

```css
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}

.list {
  display: grid;
  gap: 12px;
}
```

## 値の省略

### ショートハンド
- 可能な限りショートハンドを使用しない
- 明示的に記述

```css
/* Good */
padding: 24px;

/* Avoid */
padding: 24px 24px 24px 24px;
```

## レスポンシブデザイン

### ビューポート単位
- `vh`, `vw` を活用

```css
.sidebar {
  height: 100vh;
}

.section {
  min-height: 100vh;
}
```

## フォント

### サイズ
- `px` 単位を使用
- 相対的なサイズは考慮しない

```css
.section__title {
  font-size: 28px;
}
```

### ウェイト
- `bold` などのキーワードを使用

```css
a:target-current {
  font-weight: bold;
}
```

## マージンとパディング

### 方向指定
- 必要な方向のみ指定

```css
.section__title {
  margin-bottom: 24px;
}

.main {
  margin-left: 150px;
}
```

### 値
- 4の倍数を基本とする（12px, 24px, 40px）

```css
gap: 12px;
padding: 24px;
padding: 40px;
```
