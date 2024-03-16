import CObj from './m_obj'
import COutfit from './m_outfit'

///////////////////////////////////////////
// ЭФФЕКТЫ

// описание эффекта одежды или заклинания
export const enum EffectApplyKind {
  ADD = 'add',
  MULT = 'mult',
  PWR = 'pwr',
}
export interface ObjEffect {
  trgObjName: string // какой объект получает эффект
  trgProp: string // какое свойство будет увеличено
  value: number // значение увеличения
  effectKind: EffectApplyKind // способ увеличения
  length: number // остаток длительности эффекта в секундах
}
export interface ActiveEffect extends ObjEffect {
  trgObj: CObj // какой объект получает эффект
  srcObj: CObj // какой объект дает эффект
}

export const effectList = new Array<ActiveEffect>() // список действующих эффектов

///////////////////////////////////////////
// ОДЕЖДА

// тип предмета
export const enum OutfitType {
  OUTFIT_HEAD = 'head',
  OUTFIT_NECK = 'neck',
  OUTFIT_HAND = 'hand',
  OUTFIT_BOOT = 'boot',
  OUTFIT_ROBE = 'robe',
  OUTFIT_RING = 'ring',
  OUTFIT_CLOAK = 'cloak',
  OUTFIT_BAG = 'bag',
}
// тип слотов
export const outfitSlotTypes: Array<OutfitType> = [
    OutfitType.OUTFIT_HEAD,
    OutfitType.OUTFIT_NECK,
    OutfitType.OUTFIT_HAND,
    OutfitType.OUTFIT_BOOT,
    OutfitType.OUTFIT_ROBE,
    OutfitType.OUTFIT_RING,
    OutfitType.OUTFIT_CLOAK,
    OutfitType.OUTFIT_BAG,
]

export const outfitList = new Array<COutfit|undefined>(outfitSlotTypes.length) // список одетых вещей
