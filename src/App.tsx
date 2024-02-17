import React from 'react'
import logo from './logo.svg'
import './App.css'
import VShopList from './view/v_onsalelist'
import VHeader from './view/v_header'
import VObj from './view/v_obj'
import VPlaceInfo from './view/v_placeinfo'

export default function App() {
  return (
    <div className="App">
      <VHeader />
      <table className="mainUI">
        <thead>
          <tr>
            <td id="captionStat">stat</td>
            <td id="captionMenu">menu here</td>
            <td id="captionLog">event history</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td id="panelStat">stat creating in process...</td>
            <VShopList />
            <td id="panelGeneral">actions creating in process...</td>
            <td id="panelLog">log creating in process...</td>
            <VPlaceInfo />
            <VObj />
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th id="panelFoot" colSpan={3}>
              The table footer
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
