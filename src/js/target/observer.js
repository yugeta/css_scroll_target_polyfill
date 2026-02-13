import { Util } from "../util.js"

export class Observer extends Util{
  constructor(){
    super()
    const [targets, parents] = this.get_target_elements()
    this.targets = targets
    this.parents = parents
  }

  async init(){
    for(const parent of this.parents){
      parent.addEventListener("scroll",     this.scroll_hundler.bind(this))
    }
    window.addEventListener("hashchange", this.scroll_hundler.bind(this))
    this.update()
  }

  scroll_hundler(){
    this.update()
  }

  update(){
    let current = null
    let min = Infinity
    let found = false
    const direction = this.get_scroll_direction(this.targets)
    for(const data of this.targets){
      const rect = data.pos_target.getBoundingClientRect()
      const pos = direction === "horizontal" ? Math.abs(rect.left) : Math.abs(rect.top) 
      if(pos < min){
        min = pos
        current = data.pos_target
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
}
