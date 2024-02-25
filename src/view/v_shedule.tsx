import React, { MouseEventHandler, useState } from 'react'
import classes from './v_shedule.module.css'
import { iList } from '../model/m_data'
import CAction from '../model/m_action'

export default function VShedule() {
  const [shedule, setShedule] = useState(new Array<CAction>())

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
        </div>
      ))}
    </div>
  )
}
