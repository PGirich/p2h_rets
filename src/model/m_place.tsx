import CObj from './m_obj'

export default class CPlace extends CObj {
  static currentPlace: string = ''
  location: string
  constructor(
    pname: string,
    pcaption: string,
    pcomment: string,
    plocation = '*'
  ) {
    super(pname, pcaption, pcomment)
    this.type = 'place'
    this.location = plocation
  }
  travel(): boolean {
    CPlace.currentPlace = this.name
    return true
  }
}
