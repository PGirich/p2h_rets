import CObj from './m_obj'
import { oList, iList, shopList, actList } from './m_data'

export default  class CPlace extends CObj {
  static currentPlace : string = ''
  location: string
  constructor(pname : string, pcaption : string, pcomment : string, plocation = '*') {
    super(pname, pcaption, pcomment)
    this.type = 'place'
    this.location = plocation
  }
  travel(pname:string):CPlace {
    CPlace.currentPlace = pname
    return this
  }
}
