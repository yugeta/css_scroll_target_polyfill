import { Util } from "./util.js"

export class Css extends Util{
  constructor(){
    super()
  }

  // 初期化処理
  async init(){
    let value = ""
    value += await this.get_style_value()
    value += await this.get_link_value()
    if(!value || !this.has_targets(value)){return}
    value = this.remove_comments(value)
    this.css_value = value

    const datas = this.get_targets(value)
    this.set_targets(datas)  
  }

  // styleタグからcssを取得する処理
  async get_style_value(){
    const styles = document.querySelectorAll(`style`)
    let value = ""
    for(const style of styles){
      const style_value = style.textContent
      value += this.get_imports(style_value)
    }
    return value
  }

  // linkタグからcssを取得する処理
  async get_link_value(){
    let value = ""
    const links = document.querySelectorAll(`link[rel='stylesheet']`)
    for(const link of links){
      if(!link.href){continue}
      if(!this.is_same_domain(link.href)){continue} // 外部ドメインは対象外にする
      value += await this.load_text_file(link.href)
    }
    return value
  }

  // css文字列内から、@importを取得して、ファイル読み込み文字列と置き換える処理
  async get_imports(base_path, value){
    if(!value || !value.match(/@import/)){return value}
    const base_url = this.get_base_url(base_path)
    const imports = value.matchAll(/@import\s+["']([^"']+)["'];/g)
    if(imports){
      for(const match of imports){
        const url = base_url + match[1]
        const import_value = await this.load_text_file(url)
        value = value.replace(match[0], import_value)
      }
    }
    return value
  }

  // target処理を取得
  get_targets(value){
    return {
      current : this.extract(value, 'target-current'),
      before  : this.extract(value, 'target-before'),
      after   : this.extract(value, 'target-after'),
    }
  }

  // selectorとcss内容を取得する
  extract(value, pseudo){
    const regex = new RegExp(
      `(^|})\\s*([^{}]+):${pseudo}\\s*{([^}]*)}`,
      "g"
    );

    const result = [];
    const matches = value.matchAll(regex);

    for(const match of matches){
      result.push({
        selector: match[2].trim(),
        style: match[3].trim()
      });
    }

    return result;
  }

  // コメント削除
  remove_comments(value){
    return value.replace(/\/\*[\s\S]*?\*\//g, '')
  }

  // 種別にcssを追加する処理
  set_targets(datas){
    if(!datas){return}
    const sheet = this.get_stylesheet()
    for(const pseudo in datas){
      const items = datas[pseudo]
      for(const item of items){
        const styles = item.style.split(";")
        for(const style of styles){
          if(!style.trim()){continue}
          const rule = `${item.selector}[${this.attribute_name}="${pseudo}"] { ${style.trim()} }`
          try{
            sheet.insertRule(rule, sheet.cssRules.length)
            this.set_elm_attribute(item.selector)
          }
          catch(err){
            console.error("insertRule error:", rule, err);
          }
        }
      }
    }
  }

  // 対象のelementに、属性をセット
  set_elm_attribute(selector){
    const elms = document.querySelectorAll(selector)
    for(const elm of elms){
      elm.setAttribute(this.attribute_name, "")
    }
  }
}
