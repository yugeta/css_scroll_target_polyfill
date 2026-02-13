# JavaScript コーディングルール

## ファイル構成

### モジュール構造
- ES6モジュール（`import`/`export`）を使用
- 1ファイル1クラスを基本とする
- ファイル名はクラス名の小文字版（例: `Css` → `css.js`）

### インポート順序
```javascript
import { Util } from "./util.js"
import { Css }  from "./css.js"
import { Observer } from "./observer.js"
```
1. 基底クラス（Util）
2. その他のクラス（アルファベット順）

## クラス設計

### 継承
- 共通機能は `Util` クラスに集約
- すべての主要クラスは `Util` を継承

```javascript
export class Css extends Util{
  constructor(){
    super()
  }
}
```

### コンストラクタ
- 必ず `super()` を最初に呼び出す
- 初期化処理は `init()` メソッドに分離

### メソッド命名規則
- 小文字とアンダースコアを使用（スネークケース）
- 取得系: `get_xxx()`
- 設定系: `set_xxx()`
- 判定系: `is_xxx()`, `has_xxx()`
- 非同期処理: `async` キーワードを使用

```javascript
async get_style_value(){}
set_elm_attribute(selector){}
is_same_domain(url){}
has_targets(value){}
```

## コーディングスタイル

### インデント
- 2スペース

### 中括弧
- 開き中括弧は同じ行
- 閉じ中括弧は独立した行

```javascript
if(condition){
  // 処理
}
```

### 条件文
- 条件式の括弧内にスペースを入れない
- 早期リターンを活用

```javascript
if(!value || !this.has_targets(value)){return}
```

### ループ
- `for...of` を優先的に使用
- 配列操作には適切なメソッドを使用

```javascript
for(const style of styles){
  const style_value = style.textContent
  value += this.get_imports(style_value)
}
```

### 文字列
- テンプレートリテラルを使用
- セレクタなどはバッククォートで囲む

```javascript
const styles = document.querySelectorAll(`style`)
const rule = `${item.selector}[${this.attribute_name}="${pseudo}"] { ${style.trim()} }`
```

### 正規表現
- 複数行の正規表現は見やすく整形
- `matchAll()` を使用して全マッチを取得

```javascript
const regex = new RegExp(
  `(^|})\\s*([^{}]+):${pseudo}\\s*{([^}]*)}`,
  "g"
);
```

## 非同期処理

### async/await
- Promiseは `async/await` で処理
- 複数の非同期処理は順次実行

```javascript
async init(){
  await new Css().init()
  await new Observer().init()
}
```

### fetch API
- ファイル読み込みは `fetch()` を使用
- エラーハンドリングは必要に応じて実装

```javascript
async load_text_file(path){
  const res = await fetch(path)
  let value = await res.text()
  return value
}
```

## エラーハンドリング

### try-catch
- 予期されるエラーは `try-catch` で捕捉
- エラーメッセージは具体的に記述

```javascript
try{
  sheet.insertRule(rule, sheet.cssRules.length)
}
catch(err){
  console.error("insertRule error:", rule, err);
}
```

## DOM操作

### セレクタ
- `querySelectorAll()` を使用
- 属性セレクタは明示的に記述

```javascript
const elms = document.querySelectorAll(selector)
const all_elements = document.querySelectorAll(`[${this.attribute_name}]`)
```

### イベントリスナー
- `addEventListener()` を使用
- コールバックは `bind(this)` でコンテキストを保持

```javascript
window.addEventListener("scroll", this.update.bind(this));
window.addEventListener("hashchange", this.update.bind(this));
```

## 初期化パターン

### DOMContentLoaded
- `document.readyState` で状態を確認
- 既に読み込み済みの場合は即座に実行

```javascript
switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}
```

## コメント

### 処理の説明
- メソッドの目的を簡潔に記述
- 複雑なロジックには補足説明を追加

```javascript
// styleタグからcssを取得する処理
async get_style_value(){
  // ...
}

// 外部ドメインは対象外にする
if(!this.is_same_domain(link.href)){continue}
```

## 変数命名

### 変数名
- 小文字とアンダースコアを使用（スネークケース）
- 意味のある名前を使用

```javascript
const base_url = this.get_base_url(base_path)
const link_target = elm
const pos_target = document.querySelector(hash)
```

### 定数
- ゲッターで定義
- 大文字は使用せず、通常の命名規則に従う

```javascript
get attribute_name(){
  return "css-polyfill-target"
}
```

## パフォーマンス

### 早期リターン
- 不要な処理はスキップ

```javascript
if(this.support_browser){return}
if(!value || !this.has_targets(value)){return}
```

### DOM操作の最小化
- 必要な要素のみを対象にする
- 属性の存在確認を行う

```javascript
if(!link.href){continue}
if(!hash){continue}
```
