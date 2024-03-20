import React, { ReactNode } from 'react'
import { action, makeAutoObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { oList } from './m_data'
import { PLACE_VILLAGE } from './m_init'
import CPlace from './m_place'
import CObj from './m_obj'

// type definition
// типы логируемых данных
export const enum LoggedEventTypes {
  LOGGED_ACTIONS = 'actions',
  LOGGED_LOOT = 'loot',
  LOGGED_UNLOCK = 'unlock',
  LOGGED_BATTLE = 'battle',
}
// структура логируемых данных
export interface LogEvent {
  type: LoggedEventTypes
  str: string
  obj: CObj | undefined
  count: number
  when: number
}

// data model
export class GameState {
  currentPlace: CPlace // selected place define environment
  currentTime: number // current time of game
  log: LogEvent[]
  constructor() {
    makeAutoObservable(this, {
      currentPlace: observable,
      currentTime: observable,
      log: observable,
      toLog: action,
    })
    this.currentPlace = oList.get(PLACE_VILLAGE) as CPlace
    this.currentTime = Date.now()
    this.log = []
  }
  // log event
  toLog = (
    type: LoggedEventTypes,
    str: string,
    obj: CObj | undefined = undefined
  ) => {
    const le = this.log[0]
    if (le && le.type === type && le.str === str && le.obj === obj) {
      this.log[0].count++
    } else {
      this.log.unshift({ type, str, obj, count: 1, when: Date.now() })
    }
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
    <GameStateContext.Provider value={new GameState()}>
      {props.children}
    </GameStateContext.Provider>
  )
}

// пример использования
// const GameStateViewer = observer(() => {
//   const gameState = useGameState()
//   return <span>Place: {gameState.currentPlace.caption}</span>
// })
