import React, { ReactNode } from 'react'
import { makeAutoObservable } from 'mobx'
import { ObjActionTypes } from './store.reducer'
import { injectStores } from '@mobx-devtools/tools'

// type definition
export const enum AppStates {
  APP_STARTING = 'starting', // waiting for start options
  APP_LOADING = 'loading', // loading metadata, saved data
  APP_WAITING = 'waiting', // waiting for begin game
  APP_PAUSE = 'on pause', // service screen
  APP_ACTIVE = 'active', // game running
}

// data model
export class AppState {
  version: string
  state: AppStates // game state
  isObjHidingMode: boolean // hiding controls mode
  currentTab: ObjActionTypes // current tab
  tabs: ObjActionTypes[]
  constructor() {
    makeAutoObservable(this)
    this.version = '0.1'
    this.state = AppStates.APP_STARTING // game state
    this.isObjHidingMode = false // hiding controls mode
    this.currentTab = ObjActionTypes.ACTION_TRAVEL // current tab
    this.tabs = [
      ObjActionTypes.ACTION_TRAVEL,
      ObjActionTypes.ACTION_BUY,
      ObjActionTypes.ACTION_PERFORM,
      ObjActionTypes.ACTION_EQUIP,
    ]
  }
  setAppState(state: AppStates) {
    this.state = state
  }
  setCurrentTab(tab: ObjActionTypes) {
    this.currentTab = tab
  }
}

export const globalAppState: AppState = new AppState() //- плохо для юнит тестирования?
injectStores({ globalAppState })

// создаем контекст
const AppStateContext = React.createContext<AppState>({} as AppState)
export const useAppState = () => {
  const context = React.useContext(AppStateContext)
  if (!context) throw new Error('Use AppState context within provider!')
  return context
}

// создаем провайдер для оборачивания функ компонента
export default function AppStateProvider(props: { children: ReactNode }) {
  return (
    <AppStateContext.Provider value={globalAppState}>
      {props.children}
    </AppStateContext.Provider>
  )
}

// пример использования
// const AppStateViewer = observer(() => {
//   const appState = useAppState()
//   return <span>App state: {appState.state}</span>
// })
