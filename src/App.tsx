import React from 'react'
import logo from './logo.svg'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="100px" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
      </header>
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
          <td id="panelGeneral">actions creating in process...</td>
          <td id="panelLog">log creating in process...</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th id="panelFoot" colSpan={3}>The table footer</th>
        </tr>
      </tfoot>
    </table>

    </div>
  )
}
