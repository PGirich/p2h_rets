import React, { useEffect, useState } from 'react'
import './App.css'
import VOnSaleList from './view/v_onsalelist'
import VHeader from './view/v_header'
import VObj from './view/v_obj'
import VPlaceInfo from './view/v_placeinfo'
import VActionList from './view/v_actionlist'
import VObjList from './view/v_objlist'
import VTabsSection from './view/v_tabssection'
import { iList, oList } from './model/m_data'

export default function App() {
  const [currentTab, setCurrentTab] = useState('onsalelist')
  {
    /*const [] = useEffect() */
  }
  return (
    <div className="App">
      <VHeader />
      <VTabsSection
        currentTab={currentTab}
        onChange={(tab: string) => setCurrentTab(tab)}
      />
      <VObjList
        cbGetObjList={() => Array.from(iList.values())}
        action={'travel'}
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
          <VObjList
            cbGetObjList={() => Array.from(iList.values())}
            action={'buy'}
          />
        </>
      )}
      {currentTab === 'inventory' && (
        <>
          <VObjList
            cbGetObjList={() => Array.from(oList.values())}
            action={'equip'}
          />
        </>
      )}
    </div>
  )
}
