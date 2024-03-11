import React, { ReactNode, useReducer } from 'react'
import CItem from '../model/m_item'


interface IStateOutfitContext {
  outfit: Array<CItem>
}
// тип передаваемого контекста
interface IPropsOutfitContext extends IStateOutfitContext {
  setOutfit: (arrItem: Array<CItem>) => void
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
  arrItem: Array<CItem>
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
    outfit: new Array<CItem>(),
  })
  // actions
  const setOutfit = (arrItem: Array<CItem>) =>
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
