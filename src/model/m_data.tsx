import CObj from './m_obj'
import CAction from './m_action'

export interface CObjCnt {
  o: CObj
  cnt: number
}
export type OnSale = Map<string, CObjCnt>

export const oList = new Map<string, CObj>() // метаданные id - объект
export const iList = new Map<string, CObj>() // в наличии id объекта - {объект, кол-во}
export const shopList = new Map<string, OnSale>() // в магазине id магазина - {id объект, кол-во}
export const actList = new Array<CAction>() // список выполняемых действий
export let currentPlace: string

export let logged = new Array<string>()
export const log = (s: string) => {
  logged.unshift(s)
  if (logged.length > 100) logged.splice(0, 10)
}
