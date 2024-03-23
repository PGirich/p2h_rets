import { MouseEventHandler, ReactElement } from 'react'
import classes from './v_shedule.module.css'
import VProgress from './v_progress'
import { actList } from '../model/m_data'
import { useGameState } from '../model/store.gamestate'
import { observer } from 'mobx-react-lite'

export const VShedule: () => ReactElement = observer(() => {
  const gameState = useGameState()

  const btRestClickHandler: MouseEventHandler = (e) => {
    gameState.currentRestAction.begin()
    gameState.shedule = actList
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
                act.end()
                gameState.shedule = actList
              }}
            >
              stop
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                act.up()
                gameState.shedule = actList
              }}
            >
              up
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                act.down()
                gameState.shedule = actList
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
