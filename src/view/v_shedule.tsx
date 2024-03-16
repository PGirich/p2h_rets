import  { MouseEventHandler } from 'react'
import classes from './v_shedule.module.css'
import { useShedule } from './v_shedule.context'
import VProgress from './v_progress'
import { actList } from '../model/m_data'

export default function VShedule() {
  const { shedule, maxTasks, currentRestAction, setShedule } = useShedule()

  const btRestClickHandler: MouseEventHandler = (e) => {
    currentRestAction.begin()
    setShedule(actList)
  }

  return (
    <div className={classes.VShedule}>
      <span>
        On shedule:{shedule.length.toString()}/{maxTasks}
      </span>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        REST
      </button>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        FOCUS
      </button>
      <br></br>
      {shedule.map((act, idx) => (
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
                setShedule(actList)
              }}
            >
              stop
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                act.up()
                setShedule(actList)
              }}
            >
              up
            </button>
            <button
              className={classes.VSheduleEntryBtn}
              onClick={() => {
                act.down()
                setShedule(actList)
              }}
            >
              down
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
