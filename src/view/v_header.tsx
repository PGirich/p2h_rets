import { ReactElement, ReactNode } from 'react'
import classes from './v_header.module.css'
import { AppState, useAppState } from '../model/store.appstate'
import { VTabsSection } from './v_tabssection'
import { observer } from 'mobx-react-lite'

export const VHeader: () => ReactElement = observer(() => {
  const appState = useAppState()
  return (
    <header className={"wrapperH "+classes.VHeader}>
      <img
        id="img.dragon"
        alt=""
        className={"headerIcon "+classes.VHeaderImg}
        src={'./img.dragon.png'}
        width="50px"
      />
      <h1>Path to Heaven</h1>
      <h2>ver.{appState.version}</h2>
      <br></br>
      <VTabsSection />
    </header>
  )
})
