import CObj from './m_obj'
import { oList, iList, shopList, actList } from './m_data'

export default  class CPlace extends CObj {
  location: string
  constructor(pname : string, pcaption : string, pcomment : string, plocation = '*') {
    super(pname, pcaption, pcomment)
    this.type = 'place'
    this.location = plocation
  }
}
