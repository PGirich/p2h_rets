import CObj from './m_obj'
import { oList, iList, shopList, actList } from './m_data'

export default class CStat extends CObj {
  max: number = 1
  constructor(
    pname: string,
    pcaption: string,
    pcomment: string
  ) {
    super(pname, pcaption, pcomment)
    this.type = 'stat'
  }
}
