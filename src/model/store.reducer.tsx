import CAction from './m_action'
import CPlace from './m_place'
import CObj from './m_obj'
import COutfit from './m_outfit'
import { globalGameState, LoggedEventTypes } from './store.gamestate'

// действия диспетчера
export const enum ObjActionTypes {
  ACTION_TRAVEL = 'travel',
  ACTION_PERFORM = 'perform',
  ACTION_BUY = 'buy',
  ACTION_SELL = 'sell',
  ACTION_UNLOCK = 'unlock',
  ACTION_EQUIP = 'equip',
}

// обработка
export const objActionReducer = (action: ObjActionTypes, obj: CObj) => {
  const state = globalGameState
  let res: boolean
  switch (action) {
    case ObjActionTypes.ACTION_TRAVEL:
      res = (obj as unknown as CPlace).travel()
      if (res) state.currentPlace = obj as unknown as CPlace
      break
    case ObjActionTypes.ACTION_PERFORM:
      res = (obj as unknown as CAction).begin()
      break
    case ObjActionTypes.ACTION_BUY:
      res = obj.buy(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_SELL:
      res = obj.sell(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_UNLOCK:
      res = obj.unlock(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_EQUIP:
      res = (obj as unknown as COutfit).equip()
      break
    default:
      res = false
      break
  }
  if (res)
    state.toLog(
      action === ObjActionTypes.ACTION_UNLOCK
        ? LoggedEventTypes.LOGGED_UNLOCK
        : LoggedEventTypes.LOGGED_ACTIONS,
      action,
      obj
    )
  // if (aType === ObjActionTypes.ACTION_PERFORM) setShedule(actList)
  // if (aType === ObjActionTypes.ACTION_EQUIP) setOutfit(outfitList)
  return res
}
