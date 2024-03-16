import VObj from './v_obj'
import CObj from '../model/m_obj'
import { ObjActionTypes, useObj } from './v_obj.context'
import classes from './v_objlist.module.css'
import useInput from '../hooks/useinput'

interface propsVObjList {
  cbGetObjList: () => Array<CObj> // получение массива объектов
  action: ObjActionTypes // действие над объектами при нажатии в списке
}
export default function VObjList(props: propsVObjList) {
  const inpFlt = useInput('')
  const { currentPlace /*, actionDispatch*/ } = useObj()
  const objList: Array<CObj> = props.cbGetObjList()

  function isFiltered(value: CObj) {
    return value.caption.toUpperCase().includes(inpFlt.value)
  }

  return (
    <div className={classes.VObjList}>
      <label htmlFor="inputFilter">Filter:</label>
      <input
        type="text"
        id="inputFilter"
        className="inputFilter"
        {...inpFlt}
      />
      <label> Total:{objList.length.toString()}</label>
      <br></br>
      {Array.from(objList.values())
        .filter(isFiltered)
        .map((o) => (
          <VObj
            key={o.name}
            obj={o}
            action={props.action}
            isActive={o.name === currentPlace.name}
          />
        ))}
    </div>
  )
}
