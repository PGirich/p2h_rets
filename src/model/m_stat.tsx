import CObj from './m_obj.js'
import { oList, iList, shopList, actList } from './m_data.js'

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
