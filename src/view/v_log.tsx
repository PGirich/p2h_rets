import React, { MouseEventHandler, useState } from 'react'
import classes from './v_log.module.css'
import { logged } from '../model/m_data'

export default function VLog() {
  const [loggedStr, setloggedStr] = useState('')
  const btClearClickHandler: MouseEventHandler = (e) => {
    console.log(e.target)
  }

  return (
    <div className={classes.VLog}>
      <button className="button" onClick={btClearClickHandler}>
        CLEAR
      </button>
      <br></br>
      {logged.map((s) => (
        <br>{s}</br>
      ))}
    </div>
  )
}
