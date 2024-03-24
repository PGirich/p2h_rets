import VObj from './v_obj'
import CObj from '../model/m_obj'
import { ObjActionTypes } from '../model/store.reducer'
import classes from './v_objlist.module.css'
import useInput from '../hooks/useinput'
import COutfit from '../model/m_outfit'
import { useGameState } from '../model/store.gamestate'
import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import GetObjListForAction from './v_activetab.content'
import { useAppState } from '../model/store.appstate'

export const VObjList: () => ReactElement = observer(() => {
  const gameState = useGameState()
  const appState = useAppState()
  const action = appState.currentTab
  const objList = GetObjListForAction(action)
  console.log(action)

  // hilight selected object
  let objIsActive: (o: CObj) => boolean // функция для определения активности объекта
  switch (action) {
    case ObjActionTypes.ACTION_TRAVEL:
      objIsActive = (o: CObj) => o === gameState.currentPlace
      break
    case ObjActionTypes.ACTION_EQUIP:
      objIsActive = (o: CObj) =>
        gameState.outfit.includes(o as unknown as COutfit)
      break
    default:
      objIsActive = (o: CObj) => false
  }

  // filtering by obj name
  const inpFlt = useInput('')
  function isFiltered(value: CObj) {
    return value.caption.toUpperCase().includes(inpFlt.value)
  }
  if (!objList || objList.length === 0) return <></>
  return (
    <div className={classes.VObjList}>
      <label>
        Filter:
        <input id="inpFlt" type="text" className="inputFilter" {...inpFlt} />
      </label>
      <span> Total:{objList.length.toString()}</span>
      <br></br>
      {Array.from(objList.values())
        .filter(isFiltered)
        .map((o) => (
          <VObj
            key={o.name}
            obj={o}
            action={action}
            isActive={objIsActive(o)}
          />
        ))}
    </div>
  )
})
