import { MouseEventHandler } from 'react'
import CObj from '../model/m_obj'
import classes from './v_obj.module.css'
import { ObjActionTypes } from '../model/store.reducer'
import { useGameState } from '../model/store.gamestate'

interface propsVObj {
  obj: CObj
  action: ObjActionTypes
  isActive: boolean
}
export default function VObj(props: propsVObj) {
  const gameState = useGameState()

  const obj = props.obj
  if (!obj) return null
  const handleObjOnClick: MouseEventHandler = (e) => {
    gameState.actionDispatch(props.action, obj)
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
