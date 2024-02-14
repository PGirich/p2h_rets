import CObj from './m_obj.js'
import { oList, iList, shopList, actList } from './m_data.js'
import {
  ObjConditionData,
  ObjChangeData,
  ObjConditionsCheck,
  ObjChangesApply,
} from './m_condition.js'

export default class CAction extends CObj {
  // мета
  resTic : ObjChangeData[] // изменения от действия в секунду
  ticSucess = false // признак успешности в секунду
  actionLength = 1 // длительность действия в секундах
  // выполнение
  actionProgress: number // прогресс действия в секундах

  constructor(pname: string, pcaption: string, pcomment: string) {
    super(pname, pcaption, pcomment)
    this.type = 'action'
    this.actionProgress = 0
  }
  inAction(): boolean {
    return actList.findIndex(this) !== -1
  }
  begin(): CObj {
    if (!this.inAction()) {
      actList.push(this)
      this.actionProgress = 0
    }
    return this
  }
  end(): CObj {
    const i = actList.findIndex(this)
    if (i !== -1) {
      actList.slice(i, 1)
    }
  }
}
