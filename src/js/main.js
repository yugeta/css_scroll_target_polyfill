import { Util } from "./util.js"
import { Css }      from "./css.js"
import { Observer } from "./observer.js"

class Main extends Util{
  constructor(){
    super()
    // ブラウザが対応している場合は処理しない
    if(this.support_browser){return}
    this.init()
  }

  async init(){
    await new Css().init()
    await new Observer().init()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}