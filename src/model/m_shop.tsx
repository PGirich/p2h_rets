import CObj from './m_obj'
import CPlace from './m_place'
import { oList, iList, shopList, actList } from './m_data'

export default class CShop extends CPlace {
  constructor(
    pname: string,
    pcaption: string,
    pcomment: string,
    plocation: string
  ) {
    super(pname, pcaption, pcomment, plocation)
    this.type = 'shop'
  }
}
