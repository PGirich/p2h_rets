import CObj from './m_obj'
import { oList, iList, shopList, actList, CObjCnt } from './m_data'

// структура для указания условия
export interface ObjConditionData {
  prop: string
  op: string
  val: number
  specfn: () => boolean // нестандартное условие
  specDesc: string // его описание
  result: boolean
}
// структура для применения результата
export interface ObjChangeData {
  prop: string
  cost: number
  result: boolean
}

// проверка конкретного условия
const ObjConditionCheck = (cd: ObjConditionData): boolean => {
  cd.result = false
  if (!cd.specfn) {
    let p: CObj | undefined = iList.get(cd.prop)
    if (!p) return false
    let val = p.count
    switch (cd.op) {
      case '>':
        if (val <= cd.val) return false
        break
      case '<':
        if (val >= cd.val) return false
        break
      default:
        if (val != cd.val) return false
    }
  } else {
    if (!cd.specfn()) return false
  }
  cd.result = true
  return true
}

// проверка выполнения условия
export const ObjConditionsCheck = (cda: ObjConditionData[]): boolean => {
  let res = true
  cda.forEach((cd) => {
    res &&= ObjConditionCheck(cd)
  })
  return res
}

// проверка возможности применения одного изменения
const ObjChangeCheck = (cd: ObjChangeData): boolean => {
  cd.result = false
  let p: CObj | undefined = iList.get(cd.prop)
  if (!p) return false
  if (p.count < cd.cost) return false
  cd.result = true
  return true
}

// применение изменений
export const ObjChangesApply = (cda: ObjChangeData[]): boolean => {
  let res = true
  cda.forEach((cd) => {
    res &&= ObjChangeCheck(cd)
  })
  if (!res) return false
  cda.forEach((cd) => {
    let p = iList.get(cd.prop)
    p!.count -= cd.cost
  })
  return true
}
