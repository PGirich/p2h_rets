import React, { ReactElement } from 'react'
import VTabButton from './v_tabbutton'

export default function VTabsSection(props: {
  currentTab: string
  onChange: (tab: string) => void
}): ReactElement {
  return (
    <section className="VTabsSection" style={{ marginBottom: '1rem' }}>
      <VTabButton
        key={'actionlist'}
        isActive={props.currentTab === 'actionlist'}
        onClick={() => props.onChange('actionlist')}
      >
        Actions
      </VTabButton>
      <VTabButton
        key={'onsalelist'}
        isActive={props.currentTab === 'onsalelist'}
        onClick={() => props.onChange('onsalelist')}
      >
        Available
      </VTabButton>
      <VTabButton
        key={'inventory'}
        isActive={props.currentTab === 'inventory'}
        onClick={() => props.onChange('inventory')}
      >
        Inventory
      </VTabButton>
    </section>
  )
}
