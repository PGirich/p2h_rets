import React, { MouseEventHandler, useState } from 'react'
import CObj from '../model/m_obj'
import classes from './v_obj.module.css'
import { LogTypes, useLog } from './v_log.context'

interface propsVObj {
  obj: CObj
  action: string
  isActive: boolean
}
export default function VObj(props: propsVObj) {
  const appLog = useLog()

  const obj = props.obj
  const handleObjOnClick: MouseEventHandler = (e) => {
    obj.actionDispatch(props.action)
    appLog.toLog({
      type:
        props.action === 'unlock'
          ? LogTypes.TYPE_UNLOCK
          : LogTypes.TYPE_ACTIONS,
      obj: obj,
      str: props.action,
      when: Date.now(),
      val: 1,
    })
  }

  return (
    <div
      className={
        props.isActive
          ? `${classes.VObj} ${classes.VObjActive}`
          : `${classes.VObj}`
      }
      onClick={handleObjOnClick}
    >
      <img className={classes.VObjImg} src={obj.picture} />
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
