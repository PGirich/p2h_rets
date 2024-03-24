import React, { ReactNode, useEffect } from 'react'
import { action, makeAutoObservable, observable } from 'mobx'
import { actList, actListApply, oList } from './m_data'
import loadMetaData, { STAT_AGE, STAT_AGE_REBORN } from './m_init'
import CPlace from './m_place'
import CObj from './m_obj'
import { objActionReducer, ObjActionTypes } from './store.reducer'
import COutfit from './m_outfit'
import { outfitList } from './m_effect'
import CAction from './m_action'
import { AppStates, globalAppState } from './store.appstate'
import CStat from './m_stat'
import loadSavedData from './m_load'
import initNewGame from './m_newgame'

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
  actionDispatch: (action: ObjActionTypes, obj: CObj) => boolean // action dispatch function
  currentPlace: CPlace // selected place define environment
  currentTime: number // current time of game
  log: LogEvent[] // logged events
  outfit: Array<COutfit | undefined> // outfit data
  shedule: Array<CAction> // scheduled actions
  sheduleFocus: number // resource of focus for action speedup
  currentRestAction: CAction // current action for rest
  sheduleMaxTasks: number // max acive tasks
  currentAge: number // age of hero

  constructor() {
    makeAutoObservable(this, {
      currentTime: observable,
      actionDispatch: observable,
      currentPlace: observable,
      setCurrentPlace: action,
      log: observable,
      toLog: action,
      outfit: observable,
      shedule: observable,
      sheduleFocus: observable,
      currentRestAction: observable,
      sheduleMaxTasks: observable,
      currentAge: observable,
    })
    this.actionDispatch = (action: ObjActionTypes, obj: CObj) => false
    this.currentTime = Date.now()
    this.currentPlace = {} as CPlace
    this.log = []
    this.outfit = outfitList
    this.shedule = actList
    this.sheduleFocus = 0
    this.currentRestAction = {} as CAction
    this.sheduleMaxTasks = 10
    this.currentAge = STAT_AGE_REBORN
  }
  //
  setCurrentPlace = (place: CPlace) => {
    this.currentPlace = place
  }
  setOutfit = (outfit: Array<COutfit | undefined>) => {
    this.outfit = outfit
  }
  setShedule = (shedule: Array<CAction>) => {
    this.shedule = shedule
  }
  setSheduleFocus = (focus: number) => {
    this.sheduleFocus = focus
  }
  setCurrentRestAction = (rest: CAction) => {
    this.currentRestAction = rest
  }
  setSheduleMaxTasks = (mt: number) => {
    this.sheduleMaxTasks = mt
  }
  setCurrentAge = (age: number) => {
    this.currentAge = age
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

  startLoading() {
    globalAppState.setAppState(AppStates.APP_LOADING)
    new Promise((resolve) => {
      setTimeout(() => {
        loadMetaData()
        resolve(true)
      }, 3000)
    })
      .then(() => {
        if (!loadSavedData()) initNewGame()
      })
      .then(() => {
        this.actionDispatch = objActionReducer
        globalAppState.setAppState(AppStates.APP_WAITING)
      })
  }
}

export const globalGameState = new GameState()

// создаем контекст
const GameStateContext = React.createContext<GameState>({} as GameState)
export const useGameState = () => {
  const context = React.useContext(GameStateContext)
  if (!context) throw new Error('Use GameState context within provider!')
  return context
}
// создаем провайдер для оборачивания функ компонента
export default function GameStateProvider(props: { children: ReactNode }) {
  // изменения в игре по времени, не по событию
  useEffect(() => {
    const processTimer = setInterval(() => {
      if (globalAppState.state === AppStates.APP_ACTIVE) {
        actListApply() // работаем по расписанию
        globalGameState.shedule = actList
        ;(oList.get(STAT_AGE) as unknown as CStat).count =
          ++globalGameState.currentAge // время идет
      }
    }, 1000)
    return () => clearInterval(processTimer)
  })

  return (
    <GameStateContext.Provider value={globalGameState}>
      {props.children}
    </GameStateContext.Provider>
  )
}

// пример использования
// const GameStateViewer = observer(() => {
//   const gameState = useGameState()
//   return <span>Place: {gameState.currentPlace.caption}</span>
// })
