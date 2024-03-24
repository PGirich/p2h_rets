import { ReactElement } from 'react'
import classes from './v_header.module.css'
import { AppStates, useAppState } from '../model/store.appstate'
import { observer } from 'mobx-react-lite'
import { ObjActionTypes } from '../model/store.reducer'
import { VObjList } from './v_objlist'
import { VOutfit } from './v_outfit'
import { VLoading } from './v_loading'

export const VActiveTab: () => ReactElement = observer(() => {
  const appState = useAppState()
  if (appState.state !== AppStates.APP_ACTIVE) {
    return <VLoading />
  }
  return (
    <main className={'wrapperС ' + classes.VActiveTab}>
      <>
        {appState.currentTab === ObjActionTypes.ACTION_EQUIP && <VOutfit />}
        <VObjList />
      </>
    </main>
  )
})
