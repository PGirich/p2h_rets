import VObj from './v_obj'
import CObj from '../model/m_obj'
import { ObjActionTypes } from '../model/store.reducer'
import classes from './v_objlist.module.css'
import useInput from '../hooks/useinput'
import { useOutfit } from './v_outfit.context'
import COutfit from '../model/m_outfit'
import { useGameState } from '../model/store.gamestate'

interface propsVObjList {
  cbGetObjList: () => Array<CObj> // получение массива объектов
  action: ObjActionTypes // действие над объектами при нажатии в списке
}
export default function VObjList(props: propsVObjList) {
  const gameState = useGameState()
  const { outfit } = useOutfit()
  const objList: Array<CObj> = props.cbGetObjList()

  // hilight selected object
  let objIsActive: (o: CObj) => boolean // функция для определения активности объекта
  switch (props.action) {
    case ObjActionTypes.ACTION_TRAVEL:
      objIsActive = (o: CObj) => o === gameState.currentPlace
      break
    case ObjActionTypes.ACTION_EQUIP:
      objIsActive = (o: CObj) => outfit.includes(o as unknown as COutfit)
      break
    default:
      objIsActive = (o: CObj) => false
  }

  // filtering by obj name
  const inpFlt = useInput('')
  function isFiltered(value: CObj) {
    return value.caption.toUpperCase().includes(inpFlt.value)
  }

  return (
    <div className={classes.VObjList}>
      <label htmlFor="inputFilter">Filter:</label>
      <input type="text" id="inputFilter" className="inputFilter" {...inpFlt} />
      <label> Total:{objList.length.toString()}</label>
      <br></br>
      {Array.from(objList.values())
        .filter(isFiltered)
        .map((o) => (
          <VObj
            key={o.name}
            obj={o}
            action={props.action}
            isActive={objIsActive(o)}
          />
        ))}
    </div>
  )
}
