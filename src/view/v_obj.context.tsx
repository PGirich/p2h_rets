import React, { ReactNode, useReducer } from 'react'
import { actList, oList } from '../model/m_data'
import CAction from '../model/m_action'
import CPlace from '../model/m_place'
import CObj from '../model/m_obj'
import { PLACE_VILLAGE } from '../model/m_init'
import COutfit from '../model/m_outfit'
import { LogTypes, useLog } from './v_log.context'
import { outfitList } from '../model/m_effect'
import { useShedule } from './v_shedule.context'
import { useOutfit } from './v_outfit.context'

// тип состояния
interface IStateObjContext {
  currentPlace: CPlace
}
// тип передаваемого контекста
interface IPropsObjContext extends IStateObjContext {
  actionDispatch: (obj: CObj, action: ObjActionTypes) => void
}
// создаем контекст
const ObjContext = React.createContext({} as IPropsObjContext)
export const useObj = () => {
  const context = React.useContext(ObjContext)
  if (!context) throw new Error('Use Obj context within provider!')
  return context
}
// действия диспетчера
export const enum ObjActionTypes {
  ACTION_TRAVEL = 'travel',
  ACTION_PERFORM = 'perform',
  ACTION_BUY = 'buy',
  ACTION_SELL = 'sell',
  ACTION_UNLOCK = 'unlock',
  ACTION_EQUIP = 'equip',
}
interface IObjAction {
  type: ObjActionTypes
  obj: CObj
}

// обработка
const reducer = (state: IStateObjContext, action: IObjAction) => {
  const { toLog } = useLog()
  const { setShedule } = useShedule()
  const { setOutfit } = useOutfit()

  const obj = action.obj
  const aType = action.type
  switch (aType) {
    case ObjActionTypes.ACTION_TRAVEL:
      ;(obj as unknown as CPlace).travel()
      state = { ...state, currentPlace: action.obj as unknown as CPlace }
      break
    case ObjActionTypes.ACTION_PERFORM:
      ;(obj as unknown as CAction).begin()
      break
    case ObjActionTypes.ACTION_BUY:
      obj.buy(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_SELL:
      obj.sell(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_UNLOCK:
      obj.unlock(state.currentPlace.name)
      break
    case ObjActionTypes.ACTION_EQUIP:
      ;(obj as unknown as COutfit).equip()
      break
    default:
      break
  }
  toLog({
    type:
      aType === ObjActionTypes.ACTION_UNLOCK
        ? LogTypes.TYPE_UNLOCK
        : LogTypes.TYPE_ACTIONS,
    obj: obj,
    str: aType,
    when: Date.now(),
    val: 1,
  })
  if (aType === ObjActionTypes.ACTION_PERFORM) setShedule(actList)
  if (aType === ObjActionTypes.ACTION_EQUIP) setOutfit(outfitList)
  return state
}

// провайдер
export default function ObjProvider(props: { children: ReactNode }) {
  // initial value
  const [state, dispatch] = useReducer(reducer, {
    currentPlace: oList.get(PLACE_VILLAGE) as CPlace,
  })
  //
  const actionDispatch = (obj: CObj, actn: ObjActionTypes) => {
    dispatch({ type: actn, obj })
  }
  // element
  return (
    <ObjContext.Provider
      value={{ currentPlace: state.currentPlace, actionDispatch }}
    >
      {props.children}
    </ObjContext.Provider>
  )
}
