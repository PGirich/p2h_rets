import CObj from './m_obj.js'
import CAction from './m_action.js'

export interface CObjCnt {
  o: CObj
  cnt: number
}
export type OnSale = Map<string, CObjCnt>

export const oList = new Map<string, CObj>() // метаданные id - объект
export const iList = new Map<string, CObjCnt>() // в наличии id объекта - {объект, кол-во}
export const shopList = new Map<string, OnSale>() // в магазине id магазина - {id объект, кол-во}
export const actList = new Array<CAction>() // список выполняемых действий
