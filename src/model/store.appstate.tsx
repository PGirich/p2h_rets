import React, { ReactNode } from "react"
import { ObjActionTypes } from "../view/v_obj.context"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

// type definition
export const enum AppStates {
    APP_STARTING = 'starting', // prepare metadata
    APP_LOADING = 'loading', // loading saved data
    APP_PAUSE = 'on pause', // service screen
    APP_ACTIVE = 'active', // game running
}

// data model
export class AppState {
    state : AppStates // game state 
    isObjHidingMode : boolean  // hiding controls mode
    currentTab : ObjActionTypes // current tab
    constructor(){
        makeAutoObservable(this)
        this.state = AppStates.APP_STARTING, // game state 
        this.isObjHidingMode = false,  // hiding controls mode
        this.currentTab = ObjActionTypes.ACTION_TRAVEL // current tab
    }    
}

//export const appState : AppState = new AppState() - плохо для юнит тестирования?
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
      <AppStateContext.Provider value={ new AppState() }>
        {props.children}
      </AppStateContext.Provider>
    )
  }
  
// пример использования
const AppStateViewer = observer(() => {
    const appState = useAppState()
    return ( <span>App state: {appState.state}</span> )
})
