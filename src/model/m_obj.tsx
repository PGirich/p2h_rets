import { oList, iList, shopList, OnSale, CObjCnt, actList } from './m_data.js'

export default class CObj {
  type: string // тип объекта: shop - магазин, map - карта локаций, loot - поле боя,
  //              insight - озарение персонажа, sect - хранилище секты,
  //              market - черный рынок, gift - подарок
  name: string // код объекта
  caption: string // заголовок
  comment: string // описание
  picture: string | undefined // имя файла картинки
  countable: boolean = false // количество
  condBuy = [] // условия покупки
  condUse = [] // условия доступности
  resUse = [] // результаты действия

  unlocked = false // разблокирован
  owned = false // куплен

  // объект помещается в массив метаданных
  constructor(pname: string, pcaption: string, pcomment: string) {
    this.type = 'error'
    this.name = pname
    this.caption = pcaption
    this.comment = pcomment
    this.picture = undefined
    oList.set(this.name, this)
  }

  // разблокировать и на прилавок в магазин
  // если не указан магазин - значит в инвентарь
  unlock(pshop: string = '', pcnt: number = 1) {
    // если не указан магазин - значит в инвентарь
    if(pshop===''){
      const myItem = iList.get(this.name) || { o: this, cnt: 0 }
      myItem.cnt += 1
      iList.set(this.name, myItem)
      this.unlocked = true
      this.owned = true
      return true
    }
    // нет прилавка - создадим
    let shop = shopList.get(pshop)
    if (!shop) {
      shop = new Map() as OnSale
      shopList.set(pshop, shop)
    }
    // нет товара - поместим
    let objCnt = shop!.get(this.name)
    if (!objCnt) {
      objCnt = { o: this, cnt: pcnt }
    } else {
      // если применимо - увеличим количество товара
      if (this.countable) objCnt.cnt += pcnt
    }
    shop!.set(this.name, objCnt)
    this.unlocked = true
    return this
  }
  // убрать с прилавка магазина
  lock(pshop: string) {
    const shop = shopList.get(pshop)
    if (!shop) return this
    shop.delete(this.name)
    this.unlocked = false
  }
  // купить
  buy(pshop: string, pcnt = 1): boolean {
    const shop = shopList.get(pshop)
    if (!shop) return false
    // проверяем наличие товара
    const item = shop.get(this.name)
    if (!item) return false
    // проверяем достаточность количества
    if (item.cnt < pcnt) {
      return false
    }
    // уменьшаем на прилавке
    item.cnt -= pcnt
    if (item.cnt > 0) {
      shop.set(this.name, item)
    } else {
      shop.delete(this.name)
    }
    // нет товара - поместим
    const myItem = iList.get(this.name) || { o: this, cnt: 0 }
    myItem.cnt += pcnt
    iList.set(this.name, myItem)
    this.unlocked = true
    this.owned = true
    return true
  }
  sell(pshop: string, pcnt = 1): boolean {
    return false
  }

  //отрисовка объекта
  render() {
    // количество
    let cnt = ''
    if (this.countable) {
      cnt = ' : ' + iList.get(this.name)?.cnt
    }
    // отрисовка
    const $el = document.createElement(
      `<div class="${this.type}" id="${this.name}" title="${this.comment}">${
        this.caption + cnt
      }</div>`
    )
    //

    return $el
  }
}
