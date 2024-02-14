import CObj from './m_obj.js'
import { oList, iList, shopList, actList } from './m_data.js'

export default  class CMap extends CObj {
  constructor(pname : string, pcaption : string, pcomment : string) {
    super(pname, pcaption, pcomment)
    this.type = 'map'
  }
}
