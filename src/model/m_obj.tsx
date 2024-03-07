import CAction from './m_action'
import { oList, iList, shopList, OnSale } from './m_data'
import CPlace from './m_place'

export default class CObj {
  type: string // тип объекта: shop - магазин, map - карта локаций, loot - поле боя,
  //              insight - озарение персонажа, sect - хранилище секты,
  //              market - черный рынок, gift - подарок
  name: string // код объекта
  caption: string // заголовок
  comment: string // описание
  picture: string | undefined // имя файла картинки
  countable: boolean = false // количество мб
  count: number = 0 // количество
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
    this.picture = './' + pname + '.png'
    oList.set(this.name, this)
  }

  // разблокировать и на прилавок в магазин
  // если не указан магазин - значит в инвентарь
  unlock(pshop: string = '', pcnt: number = 1) {
    // если не указан магазин - значит в инвентарь
    if (pshop === '') {
      this.count = 1 + (this.countable ? this.count : 0)
      iList.set(this.name, this)
      this.unlocked = true
      this.owned = true
      return this
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
  lock(pshop: string = '') {
    // если не указан магазин - значит в инвентарь
    if (pshop === '') {
      this.count = 0
      iList.delete(this.name)
      this.unlocked = false
      this.owned = false
      return this
    }
    // удаляем из магазина, но не из инвентаря!
    const shop = shopList.get(pshop)
    if (!shop) return this
    shop.delete(this.name)
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
    this.count = 1 + (this.countable ? this.count : 0)
    iList.set(this.name, this)
    this.unlocked = true
    this.owned = true
    return true
  }
  // продать
  sell(pshop: string, pcnt = 1): boolean {
    return false
  }
  // выполнить действие над объектом
  actionDispatch(action: string): void {
    switch (action) {
      case 'unlock':
        this.unlock()
        break
      case 'buy':
        this.buy(CPlace.currentPlace)
        break
      case 'perform':
        if (this.type === 'action') {
          ;(this as unknown as CAction).begin()
        }
        break
      case 'travel':
        if ((this.type = 'place')) {
          ;(this as unknown as CPlace).travel()
        }
        break
    }
  }
}
