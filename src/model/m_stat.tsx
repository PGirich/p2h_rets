import { CSSProperties } from "react";
import CObj from './m_obj'

export default class CStat extends CObj {
  max: number = 1
  color: string = 'Black'
  constructor(
    pname: string,
    pcaption: string,
    pcomment: string
  ) {
    super(pname, pcaption, pcomment)
    this.type = 'stat'
  }
}
