import React, { useState } from 'react'
import CObj from '../model/m_obj'
import classes from './v_obj.module.css'

interface propsVObj {
  obj: CObj
}
export default function VObj({ obj }: propsVObj) {
  return (
    <div className={classes.VObj}>
      <img className={classes.VObjImg} src={obj.picture} width="50px" />
      <div className={classes.VObjText}>
        <h1>{obj.caption}</h1>
        <h2>{obj.comment}</h2>
        <h3>{obj.type}</h3>
      </div>
    </div>
  )
}
