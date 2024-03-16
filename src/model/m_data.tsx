import CObj from './m_obj'
import CAction from './m_action'
import { ACTION_LIVE, STAT_AGE_MONTH_LENGTH } from './m_init'

export interface CObjCnt {
  o: CObj
  cnt: number
}
export type OnSale = Map<string, CObjCnt>

export const oList = new Map<string, CObj>() // метаданные id - объект
export const iList = new Map<string, CObj>() // в наличии id объекта - {объект, кол-во}
export const shopList = new Map<string, OnSale>() // в магазине id магазина - {id объект, кол-во}
export const actList = new Array<CAction>() // список выполняемых действий

export function actListApply() {
  ;(oList.get(ACTION_LIVE) as unknown as CAction).apply()
  actList.forEach((act) => act.apply())
}

export function timeToYearStr(time: number) {
  const year = Math.floor(time / (12 * STAT_AGE_MONTH_LENGTH))
  const month = Math.floor(
    (time - year * 12 * STAT_AGE_MONTH_LENGTH) / STAT_AGE_MONTH_LENGTH
  )
  return `${year}y.${month}m.`
}
