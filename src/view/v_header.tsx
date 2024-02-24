import React from 'react'
import classes from './v_header.module.css'

export default function VHeader() {
  return (
    <header className={classes.VHeader}>
      <img className={classes.VHeaderImg} src={'./img.dragon.png'}  width="50px" />
      <div className={classes.VHeaderSpan}>Path to<br></br>Heaven</div>
    </header>
  )
}
