import CObj from './m_obj.js'
import { oList, iList, shopList, actList } from './m_data.js'

export default class CShop extends CObj {
  location
  constructor(pname : string, pcaption : string, pcomment : string, plocation : string) {
    super(pname, pcaption, pcomment)
    this.type = 'shop'
    this.location = plocation
  }
}
