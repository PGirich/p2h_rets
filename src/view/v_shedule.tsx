import React, { MouseEventHandler } from 'react'
import classes from './v_shedule.module.css'
import { useShedule } from './v_shedule.context'
import VProgress from './v_progress'

export default function VShedule() {
  const { shedule, setShedule } = useShedule()

  const btRestClickHandler: MouseEventHandler = (e) => {
    console.log(e.target)
  }

  return (
    <div className={classes.VShedule}>
      <h1>On shedule:{shedule.length.toString()}</h1>
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
            <span>{act.caption + ':  '}</span>
            <VProgress
              value={act.actionProgress}
              max={act.actionLength}
              color="green"
            >
              {act.caption}
            </VProgress>
            <button className={classes.VSheduleEntryBtn}>stop</button>
            <button className={classes.VSheduleEntryBtn}>up</button>
            <button className={classes.VSheduleEntryBtn}>down</button>
          </div>
        </div>
      ))}
    </div>
  )
}
