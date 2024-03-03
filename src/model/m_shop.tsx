import CPlace from './m_place'

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
