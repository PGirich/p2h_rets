import { ObjConditionData, ObjChangeData } from './m_condition'
import { oList, iList, shopList, OnSale } from './m_data'
import { ObjEffect } from './m_effect'

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
  condBuy: ObjConditionData[] = [] // условия покупки
  condUse: ObjConditionData[] = [] // условия доступности
  resUse: ObjChangeData[] = [] // результаты действия

  unlocked = false // разблокирован
  owned = false // куплен

  effect: ObjEffect[] = [] // эффекты при одевании, использовании и др

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
  // если не указан магазин - значит в инвентарь (куплено!)
  unlock(pshop: string = '', pcnt: number = 1) {
    // если не указан магазин - значит в инвентарь
    if (pshop === '') {
      this.count = 1 + (this.countable ? this.count : 0)
      iList.set(this.name, this)
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
    return true
  }
  // убрать с прилавка магазина
  lock(pshop: string = '') {
    // если не указан магазин - значит в инвентаре
    if (pshop === '') {
      this.count = 0
      iList.delete(this.name)
      this.unlocked = false
      this.owned = false
      return true
    }
    // удаляем из магазина, но не из инвентаря!
    const shop = shopList.get(pshop)
    if (!shop) return false
    shop.delete(this.name)
    return true
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
  // применить эффекты
  applyEffects(): void {}
  // отменить примененные эффекты
  unapplyEffects(): void {}
}
