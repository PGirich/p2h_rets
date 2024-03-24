import { MouseEventHandler, ReactElement } from 'react'
import classes from './v_shedule.module.css'
import VProgress from './v_progress'
import { useGameState } from '../model/store.gamestate'
import { observer } from 'mobx-react-lite'
import { ObjActionTypes } from '../model/store.reducer'

export const VShedule: () => ReactElement = observer(() => {
  const gameState = useGameState()

  const btRestClickHandler: MouseEventHandler = (e) => {
    gameState.actionDispatch(
      ObjActionTypes.ACTION_PERFORM,
      gameState.currentRestAction
    )
  }

  return (
    <div className={classes.VShedule}>
      <span>
        On shedule:{gameState.shedule.length.toString()}/
        {gameState.sheduleMaxTasks}
      </span>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        REST
      </button>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        FOCUS
      </button>
      <br></br>
      {gameState.shedule.map((act, idx) => (
        <div className={classes.VSheduleEntryBox} key={idx}>
          <div className={classes.VSheduleEntryBtns}>
            <VProgress
              value={act.actionProgress}
              max={act.actionLength}
              color="green"
            >
              {(act.ticSucess ? '' : 'x ') + act.caption}
            </VProgress>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                gameState.actionDispatch(ObjActionTypes.ACTION_STOP, act)
              }}
            >
              stop
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                gameState.actionDispatch(ObjActionTypes.ACTION_SHEDULE_UP, act)
              }}
            >
              up
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                gameState.actionDispatch(
                  ObjActionTypes.ACTION_SHEDULE_DOWN,
                  act
                )
              }}
            >
              down
            </button>
          </div>
        </div>
      ))}
    </div>
  )
})
