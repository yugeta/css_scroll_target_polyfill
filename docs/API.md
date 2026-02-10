# API ドキュメント

## クラス構成

### Main クラス

エントリーポイントとなるクラス。ブラウザのサポート状況を確認し、必要に応じてPolyfillを初期化します。

#### メソッド

- `constructor()` - ブラウザのサポート状況を確認
- `init()` - CSSとObserverの初期化を実行

---

### Css クラス

CSS解析とスタイル適用を担当するクラス。

#### メソッド

- `init()` - CSS取得と解析の初期化処理
- `get_style_value()` - `<style>` タグからCSSを取得
- `get_link_value()` - `<link>` タグからCSSを取得
- `get_imports(base_path, value)` - `@import` ルールを解決
- `get_targets(value)` - target疑似クラスを抽出
- `extract(value, pseudo)` - 特定の疑似クラスのセレクタとスタイルを抽出
- `remove_comments(value)` - CSSコメントを削除
- `set_targets(datas)` - 抽出したスタイルをスタイルシートに追加
- `set_elm_attribute(selector)` - 対象要素に属性を設定

---

### Observer クラス

スクロールとハッシュ変更を監視し、要素の状態を更新するクラス。

#### メソッド

- `init()` - イベントリスナーの設定と初期更新
- `update()` - 現在の位置に基づいて要素の状態を更新
- `get_target_elements()` - 対象となる要素とリンクのペアを取得

---

### Util クラス

共通のユーティリティ機能を提供する基底クラス。

#### プロパティ

- `attribute_name` - 使用する属性名（`css-polyfill-target`）
- `support_browser` - ブラウザのサポート状況を返す

#### メソッド

- `is_same_domain(url)` - 同一ドメインかどうかを判定
- `has_targets(value)` - target疑似クラスが含まれているかチェック
- `get_base_url(base_path)` - ベースURLを取得
- `load_text_file(path)` - ファイルから文字列を取得
- `get_stylesheet()` - 新しいスタイルシートを作成

## 属性

### css-polyfill-target

このライブラリが対象要素に追加する属性です。以下の値を持ちます：

- `current` - 現在のターゲット位置にある要素
- `before` - 現在のターゲットより前にある要素
- `after` - 現在のターゲットより後にある要素

## イベント

このライブラリは以下のイベントを監視します：

- `scroll` - スクロール時に要素の状態を更新
- `hashchange` - URLハッシュ変更時に要素の状態を更新
- `DOMContentLoaded` - ページ読み込み完了時に初期化
