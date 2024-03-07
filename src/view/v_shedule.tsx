import React, { MouseEventHandler, useState } from 'react'
import classes from './v_shedule.module.css'
import { iList } from '../model/m_data'
import CAction from '../model/m_action'
import { useShedule } from './v_shedule.context'
import VProgress from './v_progress'

export default function VShedule() {
  const { shedule, setShedule } = useShedule()

  const btRestClickHandler: MouseEventHandler = (e) => {
    console.log(e.target)
  }

  return (
    <div className="VShedule">
      <h1>On shedule:{shedule.length.toString()}</h1>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        REST
      </button>
      <button className={classes.VSheduleButton} onClick={btRestClickHandler}>
        FOCUS
      </button>
      <br></br>
      {shedule.map((act) => (
        <div>
          <h1>{act.caption}</h1>
          <VProgress value = {act.actionProgress} max={act.actionLength}>{act.caption}</VProgress>
        </div>
      ))}
    </div>
  )
}
