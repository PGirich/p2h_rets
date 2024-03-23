import { ReactElement } from 'react'
import classes from './v_tabssection.module.css'
import VTabButton from './v_tabbutton'
import { observer } from 'mobx-react-lite'
import { useAppState } from '../model/store.appstate'

export const VTabsSection: () => ReactElement = observer(() => {
  const appState = useAppState()
  return (
    <nav className={'headerNav ' + classes.VTabsSection}>
      {appState.tabs.map((t) => (
        <VTabButton aType={t} isActive={appState.currentTab === t}>
          {t}
        </VTabButton>
      ))}
    </nav>
  )
})
