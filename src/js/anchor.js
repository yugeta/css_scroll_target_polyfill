import { Util } from "./util.js"
import { Observer } from "./target/observer.js"

export class Anchor extends Util{
  constructor(){
    super()
  }

  async init(){
    this.set_event()
  }

  get links(){
    const links = document.querySelectorAll(`a[href]`)
    const anchors = []
    for(const link of links){
      const href = link.getAttribute("href")
      if(!href || !href.match(/#/)){continue}
      if(new URL(link.href).host !== location.host){continue}
      anchors.push(link)
    }
    return anchors
  }

  set_event(){
    this.links.forEach(this.link.bind(this))
  }

  link(anchor){
    anchor.addEventListener('click', this.hundler.bind(this));
  }

  hundler(e){
    const targetId = e.target.getAttribute('href');

    const target = document.querySelector(targetId);
    if (!target) {return}
    e.preventDefault(); // デフォルトの挙動を抑制

    const scroller = this.get_scroll_container(target)
    if(!scroller){return}

    scroller.addEventListener('scrollend', this.scroll_end.bind(this), { once: true });

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center' // 中央にスナップさせる
    });
  }

  scroll_end(){
    new Observer().update()
  }
}