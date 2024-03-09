import { ReactElement } from 'react'
import classes from './v_tabssection.module.css'
import VTabButton from './v_tabbutton'

export default function VTabsSection(props: {
  currentTab: string
  tabs: string[]
  onChange: (tab: string) => void
}): ReactElement {
  return (
    <nav className={classes.VTabsSection}>
      {props.tabs.map((t) => (
        <VTabButton
          key={t}
          isActive={props.currentTab === t}
          onClick={() => props.onChange(t)}
        >
          {t}
        </VTabButton>
      ))}
    </nav>
  )
}
