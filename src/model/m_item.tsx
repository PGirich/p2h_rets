import CObj from './m_obj'

export default class CItem extends CObj {
  weight: number = 0
  volume: number = 0

  constructor(pname: string, pcaption: string, pcomment: string) {
    super(pname, pcaption, pcomment)
    this.type = 'item'
  }
}
