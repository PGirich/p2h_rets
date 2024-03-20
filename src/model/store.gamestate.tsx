import React, { ReactNode } from "react"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"
import { oList } from "./m_data"
import { PLACE_VILLAGE } from "./m_init"
import CPlace from "./m_place"

// type definition

// data model
export class GameState {
  currentPlace: CPlace // selected place define environment
  constructor(){
    makeAutoObservable(this)
        this.currentPlace = oList.get(PLACE_VILLAGE) as CPlace 
    }    
}

// создаем контекст
const GameStateContext = React.createContext<GameState>({} as GameState)
export const useGameState = () => {
  const context = React.useContext(GameStateContext)
  if (!context) throw new Error('Use GameState context within provider!')
  return context
}
// создаем провайдер для оборачивания функ компонента
export default function GameStateProvider(props: { children: ReactNode }) {
    return (
      <GameStateContext.Provider value={ new GameState() }>
        {props.children}
      </GameStateContext.Provider>
    )
  }
  
// пример использования
const GameStateViewer = observer(() => {
    const gameState = useGameState()
    return ( <span>Place: { gameState.currentPlace }</span> )
})
