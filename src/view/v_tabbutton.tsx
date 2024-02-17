import React, { Children } from 'react'
import classes from './v_tabbutton.module.css'

export default function VTabButton(props: {
  children: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      className={
        props.isActive
          ? `${classes.VTabButton} ${classes.VTabButtonActive}`
          : `${classes.VTabButton}`
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
