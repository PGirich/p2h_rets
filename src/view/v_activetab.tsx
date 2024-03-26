import { ReactElement } from 'react'
import classes from './v_header.module.css'
import { AppStates, useAppState } from '../model/store.appstate'
import { observer } from 'mobx-react-lite'
import { ObjActionTypes } from '../model/store.reducer'
import { VObjList } from './v_objlist'
import { VLoading } from './v_loading'
import { VOutfitList } from './v_outfitlist'

export const VActiveTab: () => ReactElement = observer(() => {
  const appState = useAppState()
  if (appState.state !== AppStates.APP_ACTIVE) {
    return <VLoading />
  }
  return (
    <main className={'wrapperС ' + classes.VActiveTab}>
      <>
        {appState.currentTab === ObjActionTypes.ACTION_EQUIP && <VOutfitList />}
        <VObjList />
      </>
    </main>
  )
})
