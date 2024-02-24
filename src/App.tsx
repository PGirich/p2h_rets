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
      {/* заголовок */}
      <VHeader />
      <VTabsSection
        currentTab={currentTab}
        tabs={['travel', 'buy', 'perform', 'equip']}
        onChange={(tab: string) => setCurrentTab(tab)}
      />
      {/* описание местонахождения */}
      <VPlaceInfo />
      {/* текущие объекты */}
      {currentTab === 'travel' && (
        <VObjList
          cbGetObjList={() =>
            Array.from(iList.values()).filter((o) => o.type === 'place')
          }
          action={'travel'}
        />
      )}
      {currentTab === 'buy' && (
        <VObjList
          cbGetObjList={() =>
            Array.from(oList.values()).filter((o) => !o.unlocked)
          }
          action={'buy'}
        />
      )}{' '}
      {currentTab === 'perform' && (
        <VObjList
          cbGetObjList={() =>
            Array.from(iList.values()).filter((o) => o.type === 'action')
          }
          action={'perform'}
        />
      )}
      {currentTab === 'equip' && (
        <VObjList
          cbGetObjList={() =>
            Array.from(iList.values()).filter((o) => o.type === 'wear')
          }
          action={'equip'}
        />
      )}
    </div>
  )
}
