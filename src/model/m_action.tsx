import CObj from './m_obj'
import { actList } from './m_data'
import {
  ObjConditionData,
  ObjChangeData,
  ObjConditionsCheck,
  ObjChangesApply,
} from './m_condition'

export default class CAction extends CObj {
  // мета
  resTic: ObjChangeData[] = [] // изменения от действия в секунду
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
    return actList.findIndex((o) => o === this) !== -1
  }
  begin(): CObj {
    if (!this.inAction()) {
      actList.push(this)
      this.actionProgress = 0
    }
    return this
  }
  end(): CObj {
    const i = actList.findIndex((o) => o === this)
    if (i !== -1) {
      actList.splice(i, 1)
    }
    return this
  }
  up(): CObj {
    const i = actList.findIndex((o) => o === this)
    if (i > 0) {
      const e = actList[i - 1]
      actList[i - 1] = actList[i]
      actList[i] = e
    }
    return this
  }
  down(): CObj {
    const i = actList.findIndex((o) => o === this)
    if (i !== -1 && i < actList.length - 1) {
      const e = actList[i + 1]
      actList[i + 1] = actList[i]
      actList[i] = e
    }
    return this
  }
  apply(): boolean {
    const res = ObjChangesApply(this.resTic)
    this.actionProgress++
    if (this.actionProgress >= this.actionLength){
      this.actionProgress =0
      ObjChangesApply(this.resUse)
    }
    return res
  }
}
