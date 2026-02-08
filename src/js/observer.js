import { Util } from "./util.js"

export class Observer extends Util{
  constructor(){
    super()
    this.targets = this.get_target_elements()
  }

  async init(){
    window.addEventListener("scroll",     this.update.bind(this));
    window.addEventListener("hashchange", this.update.bind(this));
    this.update()
  }

  update(){
    let current = null
    let min = Infinity
    let found = false
    for(const data of this.targets){
      const elm = data.pos_target
      const rect = elm.getBoundingClientRect()
      const top  = Math.abs(rect.top)
      if(top < min){
        min = top
        current = elm
      }
    }

    for(const data of this.targets){
      const elm = data.pos_target
      if (elm === current) {
        data.link_target.setAttribute(this.attribute_name, "current");
        found = true;
      } 
      else if (!found) {
        data.link_target.setAttribute(this.attribute_name, "before");
      } 
      else {
        data.link_target.setAttribute(this.attribute_name, "after");
      }
    }
  }

  get_target_elements(){
    const datas = []
    const all_elements = document.querySelectorAll(`[${this.attribute_name}]`)
    for(const elm of all_elements){
      const hash = elm.getAttribute("href")
      datas.push({
        link_target : elm,
        pos_target : document.querySelector(hash),
        hash : hash,
      })
    }
    return datas
  }
}