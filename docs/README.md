# CSS Target Polyfill ドキュメント

## 概要

このライブラリは、CSS の `:target-current`、`:target-before`、`:target-after` 疑似クラスを、まだサポートしていないブラウザでも使用できるようにするPolyfillです。

2026年2月現在、これらの機能はGoogle Chrome（およびEdge）でのみサポートされていますが、このライブラリを使用することで、他のブラウザでも同様の機能を実現できます。

## 特徴

- 対応ブラウザでは標準のCSS機能を使用し、非対応ブラウザではJavaScriptで機能を代替
- 同一ドメイン内のCSSファイルのみを対象
- `<style>` タグと `<link>` タグの両方に対応
- `@import` ルールにも対応

## インストール

HTMLの `<head>` 部分に以下のスクリプトタグを追加してください：

```html
<script type="module" src="src/js/main.js"></script>
```

## 使い方

通常のCSSと同様に、`:target-current`、`:target-before`、`:target-after` 疑似クラスを使用できます：

```css
a:target-current {
  font-weight: bold;
  color: #ff0000;
}

a:target-before {
  color: #999999;
}

a:target-after {
  color: #cccccc;
}
```

## 動作原理

1. ページ読み込み時に、すべての `<style>` タグと `<link>` タグからCSSを取得
2. CSS内の `:target-current`、`:target-before`、`:target-after` を検出
3. 対象の要素に `css-polyfill-target` 属性を追加
4. スクロールやハッシュ変更時に、現在の位置に応じて属性値を更新
5. 属性セレクタを使用してスタイルを適用

## デモ

[https://yugeta.github.io/css_scroll_target_polyfill/sample/test/](https://yugeta.github.io/css_scroll_target_polyfill/sample/test/)

## 参考

- [ICS MEDIA - CSS target疑似クラスの解説](https://ics.media/entry/260130/)
