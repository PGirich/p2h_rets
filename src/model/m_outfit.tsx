import { ObjEffect, OutfitType, itemSlotTypes, outfitList } from './m_effect'
import CItem from './m_item'

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
  equip(): void {
    // если уже одето - снимем!
    let idx = outfitList.findIndex((v) => v === this)
    if (idx > -1) {
      outfitList[idx] = undefined
      this.isEquipped = false
      this.unapplyEffects()
      return
    }
    // найдем подходящий слот и поместим туда объект
    const ot = this.outfitType
    idx = itemSlotTypes.findIndex((v) => v === ot) // всегда есть миниум один слот
    let oUnwear = outfitList[idx]
    outfitList[idx] = this
    // сместим имеющийся в сл.слот
    while (!oUnwear && idx < itemSlotTypes.length) {
      if (itemSlotTypes[idx] === ot) {
        let o = outfitList[idx]
        outfitList[idx] = oUnwear
        oUnwear = o
      }
      idx++
    }
    // отменим эффекты непоместившейся одежды
    if (oUnwear) {
      oUnwear.isEquipped = false
      oUnwear.unapplyEffects()
    }
    // применим эффекты данной одежды
    this.isEquipped = true
    this.applyEffects()
  }
}
