import { iList } from './m_data'
import { OutfitType, outfitSlotTypes, outfitList } from './m_effect'
import { STAT_WEIGHT } from './m_init'
import CItem from './m_item'
import CStat from './m_stat'

export default class COutfit extends CItem {
  outfitType: OutfitType
  isEquipped: boolean

  constructor(
    pname: string,
    pcaption: string,
    pcomment: string,
    ot: OutfitType
  ) {
    super(pname, pcaption, pcomment)
    this.type = 'outfit'
    this.outfitType = ot
    this.isEquipped = false
  }
  // одеть
  equip(): boolean {
    const sw: CStat = iList.get(STAT_WEIGHT)! as CStat
    function setO(ot: COutfit): void {
      ot.isEquipped = true
      sw.count += ot.weight
      ot.applyEffects()
    }
    function unsetO(ot: COutfit): void {
      ot.isEquipped = false
      sw.count -= ot.weight
      ot.unapplyEffects()
    }
    // если уже одето - снимем!
    let idx = outfitList.findIndex((v) => v === this)
    if (~idx) {
      outfitList[idx] = undefined
      unsetO(this)
      return false
    }
    // если не одето - проверим вес
    // todo: проверять вес за вычетом снимаемого веса
    if (this.weight + sw.count > sw.max) {
      return false
    }
    // найдем подходящий слот и поместим туда объект
    const ot = this.outfitType
    idx = outfitSlotTypes.findIndex((v) => v === ot) // всегда есть миниум один слот
    let oUnwear = outfitList[idx]
    outfitList[idx++] = this
    // сместим имеющийся в сл.слот
    while (!oUnwear && idx < outfitSlotTypes.length) {
      if (outfitSlotTypes[idx] === ot) {
        let o = outfitList[idx]
        outfitList[idx] = oUnwear
        oUnwear = o
      }
      idx++
    }
    // отменим эффекты непоместившейся одежды
    if (oUnwear) {
      unsetO(oUnwear)
    }
    // применим эффекты данной одежды
    setO(this)
    return true
  }
}
