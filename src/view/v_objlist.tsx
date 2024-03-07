import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import VObj from './v_obj'
import CObj from '../model/m_obj'
import { ObjActionTypes, useObj } from './v_obj.context'

interface propsVObjList {
  cbGetObjList: () => Array<CObj> // получение массива объектов
  action: ObjActionTypes // действие над объектами при нажатии в списке
}
export default function VObjList(props: propsVObjList) {
  const [filter, setFilter] = useState('')
  const { currentPlace, actionDispatch } = useObj()
  const objList: Array<CObj> = props.cbGetObjList()

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toUpperCase())
  }
  function isFiltered(value: CObj) {
    return value.caption.toUpperCase().includes(filter)
  }

  return (
    <div className="VObjList">
      <label htmlFor="inputFilter">Filter:</label>
      <input
        type="text"
        id="inputFilter"
        className="inputFilter"
        value={filter}
        onChange={handleFilterChange}
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
