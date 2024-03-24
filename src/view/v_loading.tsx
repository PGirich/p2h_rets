import {  MouseEventHandler, ReactElement } from 'react'
import classes from './v_loading.module.css'
import { observer } from 'mobx-react-lite'
import { AppStates, useAppState } from '../model/store.appstate'
import { useGameState } from '../model/store.gamestate'

export const VLoading: () => ReactElement = observer(() => {
  const appState = useAppState()
  const gameState = useGameState()

  const onClickHandlerSkip: MouseEventHandler<HTMLButtonElement> = (e) => {
    gameState.startLoading()
  }
  const onClickHandlerStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    appState.setAppState(AppStates.APP_ACTIVE)
  }
  return (
    <div className={'wrapperС ' + classes.VLoading}>
      <div className="main">Loading...</div>
      {appState.state === AppStates.APP_STARTING && (
        <button className={classes.btnBegin} onClick={onClickHandlerSkip}>
          SKIP INTRO
        </button>
      )}
      {appState.state === AppStates.APP_WAITING && (
        <button className={classes.btnBegin} onClick={onClickHandlerStart}>
          BEGIN
        </button>
      )}
    </div>
  )
})
