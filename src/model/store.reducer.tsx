import CAction from './m_action'
import CPlace from './m_place'
import CObj from './m_obj'
import COutfit from './m_outfit'
import { globalGameState, LoggedEventTypes } from './store.gamestate'
import { outfitList } from './m_effect'
import { actList } from './m_data'

// действия диспетчера
export const enum ObjActionTypes {
  ACTION_TRAVEL = 'travel',
  ACTION_PERFORM = 'perform',
  ACTION_STOP = 'stop',
  ACTION_SHEDULE_UP = 'shedule_up',
  ACTION_SHEDULE_DOWN = 'shedule_down',
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
      if (res) state.setCurrentPlace(obj as unknown as CPlace)
      break
    case ObjActionTypes.ACTION_PERFORM:
      res = (obj as unknown as CAction).begin()
      state.setShedule(actList)
      break
    case ObjActionTypes.ACTION_STOP:
      res = (obj as unknown as CAction).end()
      state.setShedule(actList)
      break
    case ObjActionTypes.ACTION_SHEDULE_UP:
      res = (obj as unknown as CAction).up()
      state.setShedule(actList)
      break
    case ObjActionTypes.ACTION_SHEDULE_DOWN:
      res = (obj as unknown as CAction).down()
      state.setShedule(actList)
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
      state.outfit = outfitList
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
