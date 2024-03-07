import React from 'react'
import classes from './v_progress.module.css'

export default function VProgress(props: { children: string, value: number, max: number }) {
  return (
<div className={classes.VProgress}>
    <span>{props.children}</span>
    <span style = {{clip : "rect(0 "+props.value*2+"px 40px 0)"}}>{props.children}</span>
   </div>
  )
}
