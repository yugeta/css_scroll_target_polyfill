[CSS] target_current,before,afterを各種ブラウザで使用できるライブラリ
```
Create : 2026-02-08
Author : Yugeta.Koji
```

# Summary
- 2026-02現在、GoogleChrome (+ Edge)でしか使えない、target-current,before,afterの機能を他のブラウザでも使えるようにするライブラリ
- CSSのみでUI連動処理が行えるtrget-@@@機能が便利。
- 参考ブログ : https://ics.media/entry/260130/
> sample/blog/
- AI(ChatGPT)検討
> https://chatgpt.com/share/6987b67a-1018-8001-84a9-033bc025df74

# このPolyfillのポイント
- 対象のcssプロパティが使えるブラウザは、cssとして使用して、使えないブラウザはJSで機能を代替する。
- 同一ドメインのみを対象にする。

# howto
- htmlのhead部分に、以下のscriptをセットする
```
<script type="module" src="src/js/main.js"></script>
```

# 処理手順
1. 対象のcssの存在確認


