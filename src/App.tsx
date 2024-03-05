import { useState } from 'react'
import './App.css'
import VHeader from './view/v_header'
import VPlaceInfo from './view/v_placeinfo'
import VShedule from './view/v_shedule'
import VObjList from './view/v_objlist'
import VTabsSection from './view/v_tabssection'
import { iList, oList } from './model/m_data'
import VLog from './view/v_log'
import LogProvider from './view/v_log.context'
import SheduleProvider from './view/v_shedule.context'
import ObjProvider, { ObjActionTypes } from './view/v_obj.context'

export default function App() {
  const [currentTab, setCurrentTab] = useState('onsalelist')
  return (
    <LogProvider>
      <ObjProvider>
        <SheduleProvider>
          <div className="App">
            {/* заголовок */}
            <VHeader />
            <VTabsSection
              currentTab={currentTab}
              tabs={[
                ObjActionTypes.ACTION_TRAVEL,
                ObjActionTypes.ACTION_BUY,
                ObjActionTypes.ACTION_PERFORM,
                ObjActionTypes.ACTION_EQUIP,
              ]}
              onChange={(tab: string) => setCurrentTab(tab)}
            />
            {/* описание местонахождения */}
            <VPlaceInfo />
            {/* описание местонахождения */}
            <VShedule />
            {/* текущие объекты */}
            {currentTab === ObjActionTypes.ACTION_TRAVEL && (
              <VObjList
                cbGetObjList={() =>
                  Array.from(iList.values()).filter((o) => o.type === 'place')
                }
                action={ObjActionTypes.ACTION_TRAVEL}
              />
            )}
            {currentTab === ObjActionTypes.ACTION_BUY && (
              <VObjList
                cbGetObjList={() =>
                  Array.from(oList.values()).filter((o) => !o.unlocked)
                }
                action={ObjActionTypes.ACTION_BUY}
              />
            )}{' '}
            {currentTab === ObjActionTypes.ACTION_PERFORM && (
              <VObjList
                cbGetObjList={() =>
                  Array.from(iList.values()).filter((o) => o.type === 'action')
                }
                action={ObjActionTypes.ACTION_PERFORM}
              />
            )}
            {currentTab === ObjActionTypes.ACTION_EQUIP && (
              <VObjList
                cbGetObjList={() =>
                  Array.from(iList.values()).filter((o) => o.type === 'wear')
                }
                action={ObjActionTypes.ACTION_EQUIP}
              />
            )}
            <VLog />
          </div>
        </SheduleProvider>
      </ObjProvider>
    </LogProvider>
  )
}
