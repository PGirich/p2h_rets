import { MouseEventHandler } from 'react'
import classes from './v_tabbutton.module.css'
import { useAppState } from '../model/store.appstate'
import { ObjActionTypes } from '../model/store.reducer'

export default function VTabButton(props: {
  aType: ObjActionTypes
  isActive: boolean
  children: string
}) {
  const appState = useAppState()
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    appState.setCurrentTab(props.aType)
  }
  return (
    <button
      key={props.aType}
      className={
        props.isActive
          ? `${classes.VTabButton} ${classes.VTabButtonActive}`
          : `${classes.VTabButton}`
      }
      onClick={onClickHandler}
    >
      {props.children}
    </button>
  )
}
