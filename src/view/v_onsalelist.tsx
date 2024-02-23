import React from 'react'
import VObj from '../view/v_obj'
import { OnSaleListEntry, getOnSaleList } from '../controller/c_onsalelist'

export default function VOnSaleList() {
  return (
    <div className="VOnSaleList">
      <div>Items</div>
      {getOnSaleList('place_villageshop').map((osl, i) => (
        <VObj obj={osl.o} />
      ))}
    </div>
  )
}
