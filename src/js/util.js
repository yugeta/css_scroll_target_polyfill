

export class Util{
  constructor(){
    const [targets, parents] = this.get_target_elements()
    this.targets = targets
    this.parents = parents
  }

  get_target_elements(){
    const targets = []
    const parents = []
    const all_elements = document.querySelectorAll(`[${this.attribute_name}]`)
    for(const elm of all_elements){
      const hash = elm.getAttribute("href")
      if(!hash){continue}
      const target   = document.querySelector(hash)
      const scroller = this.get_scroll_container(target)
      targets.push({
        link_target : elm,
        pos_target  : target,
        hash        : hash,
        scroller    : scroller,
      })
      if(!parents.find(e => e === scroller)){
        parents.push(scroller)
      }
    }
    return [targets, parents]
  }

  css_value = null

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

  // cssにtarget処理が含まれているかチェック
  has_targets(value){
    if(value.match(/:target-before|:target-current|:target-after/)){
      return true
    }
    else{
      return false
    }
  }

  // ::scroll-marker-groupの存在確認
  has_scroll_marker_group(value){

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

  // ページ内のスタイルシート全部の詩取得
  get_stylesheet(){
    const style = document.createElement("style");
    style.setAttribute("data-target-polyfill", "true");
    document.head.appendChild(style);
    return style.sheet;
  }

  get_scroll_direction(targets){
    if(!targets || !targets.length || targets.length < 2){
       return 'vertical'; 
    }

    const firstRect  = targets[0].pos_target.getBoundingClientRect();
    const secondRect = targets[1].pos_target.getBoundingClientRect();

    // X軸（横）の距離とY軸（縦）の距離を計算
    const deltaX = Math.abs(secondRect.left - firstRect.left);
    const deltaY = Math.abs(secondRect.top - firstRect.top);

    // 縦の移動距離の方が大きければvertical、そうでなければhorizontal
    return deltaY > deltaX ? 'vertical' : 'horizontal';
  }

  // scrollコンテナの取得
  get_scroll_container(elm){
    let parent = elm.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      const overflowX = style.overflowX;
      const overflowY = style.overflowY;

      const isScrollable = /(auto|scroll|overlay)/.test(overflowX + overflowY);

      if (isScrollable &&
          (parent.scrollWidth > parent.clientWidth ||
          parent.scrollHeight > parent.clientHeight)) {
        return parent;
      }

      parent = parent.parentElement;
    }
    const final = document.scrollingElement; // 最終フォールバック
    return final.tagName === "HTML" ? window : final
  }
}