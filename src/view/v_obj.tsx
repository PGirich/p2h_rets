import { MouseEventHandler } from 'react'
import CObj from '../model/m_obj'
import classes from './v_obj.module.css'
import { LogTypes, useLog } from './v_log.context'
import { useShedule } from './v_shedule.context'
import { actList } from '../model/m_data'
import { ObjActionTypes, useObj } from './v_obj.context'
import { useOutfit } from './v_outfit.context'
import { outfitList } from '../model/m_effect'

interface propsVObj {
  obj: CObj
  action: ObjActionTypes
  isActive: boolean
}
export default function VObj(props: propsVObj) {
  const { actionDispatch } = useObj()

  const obj = props.obj
  if (!obj) return null
  const handleObjOnClick: MouseEventHandler = (e) => {
    actionDispatch(obj, props.action)
  }

  return (
    <div
      className={
        props.isActive
          ? `${classes.VObj} ${classes.VObjSelected}`
          : `${classes.VObj}`
      }
      onClick={handleObjOnClick}
    >
      <img className={classes.VObjImg} src={obj.picture} alt="" />
      <div className={classes.VObjText}>
        <h1>{obj.caption}</h1>
        <h2>{obj.comment}</h2>
        <h3>
          {obj.type}
          {` ${obj.unlocked ? 'U' : ''} ${obj.owned ? 'O' : ''} ${
            props.isActive ? 'A' : ''
          } ${obj.countable ? 'cnt:' + obj.count : 'NC'} ${props.action}`}
        </h3>
      </div>
    </div>
  )
}
