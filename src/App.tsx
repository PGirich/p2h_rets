import React, { useEffect, useState } from 'react'
import './App.css'
import VOnSaleList from './view/v_onsalelist'
import VHeader from './view/v_header'
import VObj from './view/v_obj'
import VPlaceInfo from './view/v_placeinfo'
import VActionList from './view/v_actionlist'
import VInventory from './view/v_inventory'
import VTabsSection from './view/v_tabssection'

export default function App() {
  const [currentTab, setCurrentTab] = useState('onsalelist')
  {/*const [] = useEffect() */}
  return (
    <div className="App">
      <VHeader />
      <VTabsSection
        currentTab={currentTab}
        onChange={(tab: string) => setCurrentTab(tab)}
      />
      {currentTab === 'actionlist' && (
        <>
          <VPlaceInfo />
          <VActionList />
        </>
      )}
      {currentTab === 'onsalelist' && (
        <>
          <VPlaceInfo />
          <VOnSaleList />
        </>
      )}
      {currentTab === 'inventory' && (
        <>
          <VInventory />
        </>
      )}
    </div>
  )
}
