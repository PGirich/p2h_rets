import React, { ChangeEvent, useState } from 'react'

export default function VPlaceInfo() {
  const [filter, setFilter] = useState('')
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }
  return (
    <div className="VPlaceInfo">
      <div>Places:</div>
      <form>
        <label htmlFor="inputFilter">Filter:</label>
        <input
          type="text"
          id="inputFilter"
          className="inputFilter"
          value={filter}
          onChange={handleFilterChange}
        />
      </form>
      {filter}
    </div>
  )
}
