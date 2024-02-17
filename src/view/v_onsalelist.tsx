import React from 'react'
import { OnSaleListEntry, getOnSaleList } from '../controller/c_onsalelist'
//import './?????.css'

export default function VShopList() {
  return (
    <div className="VShopList">
      <div>Places</div>
      {getOnSaleList('place_villageshop').map((osl, i) => (
        <Object/>
      ))}
    </div>
  )
}
