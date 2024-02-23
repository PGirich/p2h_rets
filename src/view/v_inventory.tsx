import React, { ChangeEvent, useState } from 'react'
import { iList } from '../model/m_data'
import VObj from './v_obj'
import CObj from '../model/m_obj'

export default function VInventory() {
  const [filter, setFilter] = useState('')
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toUpperCase())
  }
  function isFiltered(value: CObj) {
    return value.caption.toUpperCase().includes(filter)
  }
  return (
    <div className="VInventory">
      <label htmlFor="inputFilter">Filter:</label>
      <input
        type="text"
        id="inputFilter"
        className="inputFilter"
        value={filter}
        onChange={handleFilterChange}
      />
      <label>     Total:{iList.size.toString()}</label>
      <br></br>
      {Array.from(iList.values())
        .filter(isFiltered)
        .map((o) => (
          <VObj obj={o} />
        ))}
    </div>
  )
}
