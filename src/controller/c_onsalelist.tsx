import { OnSale, oList, iList, shopList, actList } from '../model/m_data'
import CObj from '../model/m_obj'

export interface OnSaleListEntry {
  o: CObj
  key: string
  caption: string
  comment: string
  cnt: number
  act: Function
  states: string
}
export function getOnSaleList(pshop: string): OnSaleListEntry[] {
  let aosl: OnSaleListEntry[] = []
  const shop: OnSale | undefined = shopList.get(pshop)
  if (!shop) return aosl
  shop.forEach((oslv, oslk) => {
    aosl.push({
      o: oslv.o,
      key: oslk,
      caption: oslv.o.caption,
      comment: oslv.o.comment,
      cnt: oslv.cnt,
      act: oslv.o.buy,
      states: '',
    } as OnSaleListEntry)
  })
  return aosl
}
