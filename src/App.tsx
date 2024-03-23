import './App.css'
import { VHeader } from './view/v_header'
import { VPlaceInfo } from './view/v_placeinfo'
import { VShedule } from './view/v_shedule'
import { iList } from './model/m_data'
import { VLog } from './view/v_log'
import { VStatList } from './view/v_statlist'
import AppStateProvider from './model/store.appstate'
import GameStateProvider from './model/store.gamestate'
import { VActiveTab } from './view/v_activetab'

export default function App() {
  return (
    <AppStateProvider>
      <GameStateProvider>
        <div className="App">
          {/* заголовок */}
          <VHeader />
          <div className="wrapper">
            {/* панель состояния*/}
            <div className="wrapperL">
              {/* описание местонахождения */}
              <VPlaceInfo />
              {/* запланированные действия */}
              <VShedule />
              {/* статы */}
              <VStatList
                cbGetObjList={() =>
                  Array.from(iList.values()).filter((o) => o.type === 'stat')
                }
              />
            </div>
            {/* содержание завиит от вкладки */}
            <div className="wrapperC">
              <VActiveTab />
            </div>
            {/* журнал */}
            <div className="wrapperR">
              <VLog />
              <>
                <h1> Text h1</h1>
                <h2> Text h2</h2>
                <h3> Text h3</h3>
                <h4> Text h4</h4>
                <h5> Text h5</h5>
                <h6> Text h6</h6>
              </>
            </div>
          </div>
        </div>
      </GameStateProvider>
    </AppStateProvider>
  )
}
