import React, { useEffect, useState } from 'react'
import './App.css'
import VHeader from './view/v_header'
import VObj from './view/v_obj'
import VPlaceInfo from './view/v_placeinfo'
import VShedule from './view/v_shedule'
import VObjList from './view/v_objlist'
import VTabsSection from './view/v_tabssection'
import { iList, oList } from './model/m_data'
import VLog from './view/v_log'
import LogProvider from './view/v_log.context'

export default function App() {
  const [currentTab, setCurrentTab] = useState('onsalelist')
  return (
    <LogProvider>
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
        {/* описание местонахождения */}
        <VShedule />
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
        <VLog />
      </div>
    </LogProvider>
  )
}
