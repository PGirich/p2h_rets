import React, { useState } from 'react'
import CObj from '../model/m_obj'
import classes from './v_obj.module.css'

interface propsVObj {
  obj: CObj
  action: string
  isActive: boolean
}
export default function VObj(props: propsVObj) {
  const obj = props.obj
  return (
    <div
      className={
        props.isActive
          ? `${classes.VObj} ${classes.VObjActive}`
          : `${classes.VObj}`
      }
      onClick={()=>obj.actionDispatch(props.action)}
    >
      <img className={classes.VObjImg} src={obj.picture} width="50px" />
      <div className={classes.VObjText}>
        <h1>{obj.caption}</h1>
        <h2>{obj.comment}</h2>
        <h3>
          {obj.type}
          {` ${obj.unlocked ? 'U' : ''} ${obj.owned ? 'O' : ''}  ${
            obj.countable ? 'cnt:' + obj.count : 'NC'
          } ${props.action}`}
        </h3>
      </div>
    </div>
  )
}
