import { Util }     from "./util.js"
import { Css }      from "./css.js"
import { Observer } from "./target/observer.js"
import { Group }    from "./marker/group.js"
import { Anchor }   from "./anchor.js"

class Main extends Util{
  constructor(){
    super()
    // ブラウザが対応している場合は処理しない
    if(this.support_browser){return}
    this.init()
  }

  async init(){
    await new Css().init()
    new Util()
    await new Observer().init()
    await new Group().init()
    await new Anchor().init()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}