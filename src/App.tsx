import { useState } from 'react'
import './App.css'
import VHeader from './view/v_header'
import VPlaceInfo from './view/v_placeinfo'
import VShedule from './view/v_shedule'
import VObjList from './view/v_objlist'
import VTabsSection from './view/v_tabssection'
import { iList, oList } from './model/m_data'
import { VLog } from './view/v_log'
import SheduleProvider from './view/v_shedule.context'
import ObjProvider, { ObjActionTypes } from './view/v_obj.context'
import VStatList from './view/v_statlist'
import OutfitProvider from './view/v_outfit.context'
import VOutfit from './view/v_outfit'
import AppStateProvider from './model/store.appstate'
import GameStateProvider from './model/store.gamestate'

export default function App() {
  const [currentTab, setCurrentTab] = useState('perform')
  return (
    <AppStateProvider>
      <GameStateProvider>
        <ObjProvider>
          <OutfitProvider>
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
                <div className="clearfix" />
                <main className="wrapper">
                  <div className="wrapperCenter">
                    {/* текущие объекты */}
                    {currentTab === ObjActionTypes.ACTION_TRAVEL && (
                      <VObjList
                        cbGetObjList={() =>
                          Array.from(iList.values()).filter(
                            (o) => o.type === 'place'
                          )
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
                          Array.from(iList.values()).filter(
                            (o) => o.type === 'action'
                          )
                        }
                        action={ObjActionTypes.ACTION_PERFORM}
                      />
                    )}
                    {currentTab === ObjActionTypes.ACTION_EQUIP && (
                      <>
                        <VOutfit />
                        <VObjList
                          cbGetObjList={() =>
                            Array.from(iList.values()).filter(
                              (o) => o.type === 'outfit'
                            )
                          }
                          action={ObjActionTypes.ACTION_EQUIP}
                        />
                      </>
                    )}
                  </div>
                  <div className="wrapperRight">
                    {/* описание местонахождения */}
                    <VPlaceInfo />
                    {/* запланированные действия */}
                    <VShedule />
                    {/* статы */}
                    <VStatList
                      cbGetObjList={() =>
                        Array.from(iList.values()).filter(
                          (o) => o.type === 'stat'
                        )
                      }
                    />
                    <VLog />
                  </div>
                </main>
              </div>
            </SheduleProvider>
          </OutfitProvider>
        </ObjProvider>
      </GameStateProvider>
    </AppStateProvider>
  )
}
