

export class Util{
  get attribute_name(){
    return "css-polyfill-target"
  }

  // ブラウザのtarget機能のサポートを判別
  get support_browser(){
    return (
       CSS.supports("selector(:target-current)")
    && CSS.supports("selector(:target-before)")
    && CSS.supports("selector(:target-after)")
    )
  }

  // 同一ドメインの判定
  is_same_domain(url){
    const sp = url.split('/')
    return sp[2] === location.host ? true : false
  }

  // target処理が含まれているかチェック
  has_targets(value){
    if(value.match(/:target-before|:target-current|:target-after/)){
      return true
    }
    else{
      return false
    }
  }

  // 対象URLから、base_url(dir)を取得
  get_base_url(base_path){
    const url = new URL(base_path, location.href);
    return url.href.split("/").slice(0, -1).join("/") + "/";
  }

  // ファイルパスから、文字列を取得(load)する処理
  async load_text_file(path){
    const res = await fetch(path)
    let value = await res.text()
    if(value){
      value = this.get_imports(path, value)
    }
    return value
  }

  // 
  get_stylesheet(){
    const style = document.createElement("style");
    style.setAttribute("data-target-polyfill", "true");
    document.head.appendChild(style);
    return style.sheet;
  }
}