import React from 'react'
import { iList } from '../model/m_data'
import VObj from './v_obj'
import CObj from '../model/m_obj'

interface propsVInventory {
  children: React.ReactNode
}
export default function VInventory() {
  return (
    <div className="VInventory">
      <div>On Sale....</div>
      { Array.from(iList.values()).map(key => {
              <VObj obj={key} />
      } ) }
    </div>
  )
}
