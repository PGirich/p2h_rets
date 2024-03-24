import { iList, oList } from '../model/m_data'
import CObj from '../model/m_obj'
import { ObjActionTypes } from '../model/store.reducer'

export default function GetObjListForAction(
  atype: ObjActionTypes
): Array<CObj> | undefined {
  switch (atype) {
    case ObjActionTypes.ACTION_TRAVEL:
      return Array.from(iList.values()).filter((o) => o.type === 'place')
    case ObjActionTypes.ACTION_BUY:
      return Array.from(oList.values()).filter((o) => !o.unlocked)
    case ObjActionTypes.ACTION_PERFORM:
      return Array.from(iList.values()).filter((o) => o.type === 'action')
    case ObjActionTypes.ACTION_EQUIP:
      return Array.from(iList.values()).filter((o) => o.type === 'outfit')
    default:
      return []
  }
}
