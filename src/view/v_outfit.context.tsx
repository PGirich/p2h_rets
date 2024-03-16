import React, { ReactNode, useReducer } from 'react'
import { outfitList } from '../model/m_effect'
import COutfit from '../model/m_outfit'


interface IStateOutfitContext {
  outfit: Array<COutfit|undefined>
}
// тип передаваемого контекста
interface IPropsOutfitContext extends IStateOutfitContext {
  setOutfit: (arrItem: Array<COutfit|undefined>) => void
}
// создаем контекст
const OutfitContext = React.createContext({} as IPropsOutfitContext)
export const useOutfit = () => {
  const context = React.useContext(OutfitContext)
  if (!context) throw new Error('Use Outfit context within provider!')
  return context
}
// действия диспетчера
const enum OutfitActionTypes {
  OUTFIT_SETOUTFIT = 'setOutfit',
}
interface IOutfitAction {
  type: OutfitActionTypes.OUTFIT_SETOUTFIT
  arrItem: Array<COutfit|undefined>
}

// обработка
const reducer = (state: IStateOutfitContext, action: IOutfitAction) => {
  switch (action.type) {
    case OutfitActionTypes.OUTFIT_SETOUTFIT:
      return { ...state, outfit: action.arrItem }
    default:
      break
  }
  return state
}

// провайдер
export default function OutfitProvider(props: { children: ReactNode }) {
  // initial value
  const [state, dispatch] = useReducer(reducer, {
    outfit: outfitList,
  })
  // actions
  const setOutfit = (arrItem: Array<COutfit|undefined>) =>
    dispatch({ type: OutfitActionTypes.OUTFIT_SETOUTFIT, arrItem })

  // element
  return (
    <OutfitContext.Provider
      value={{
        outfit: state.outfit,
        setOutfit,
      }}
    >
      {props.children}
    </OutfitContext.Provider>
  )
}
