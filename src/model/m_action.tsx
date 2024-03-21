import CObj from './m_obj'
import { actList } from './m_data'
import { ObjChangeData, ObjChangesApply } from './m_condition'

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
  begin(): boolean {
    const a = !this.inAction()
    if (a) {
      actList.push(this)
      this.actionProgress = 0
      this.ticSucess = true
    }
    return a
  }
  end(): boolean {
    const i = actList.findIndex((o) => o === this)
    const a = i !== -1
    if (a) {
      actList.splice(i, 1)
    }
    return a
  }
  up(): boolean {
    const i = actList.findIndex((o) => o === this)
    if (i > 0) {
      const e = actList[i - 1]
      actList[i - 1] = actList[i]
      actList[i] = e
    }
    return i > 0
  }
  down(): boolean {
    const i = actList.findIndex((o) => o === this)
    const a = i !== -1 && i < actList.length - 1
    if (a) {
      const e = actList[i + 1]
      actList[i + 1] = actList[i]
      actList[i] = e
    }
    return a
  }
  apply(): boolean {
    this.ticSucess = ObjChangesApply(this.resTic)
    if (this.ticSucess) {
      this.actionProgress++
      if (this.actionProgress >= this.actionLength) {
        this.actionProgress = 0
        ObjChangesApply(this.resUse)
      }
    }
    return this.ticSucess
  }
}
