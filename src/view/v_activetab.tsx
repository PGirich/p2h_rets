import { ReactElement, ReactNode } from 'react'
import classes from './v_header.module.css'
import { AppState, AppStates, useAppState } from '../model/store.appstate'
import { observer } from 'mobx-react-lite'
import { ObjActionTypes } from '../model/store.reducer'
import { VObjList } from './v_objlist'
import {VOutfit} from './v_outfit'
import { iList, oList } from '../model/m_data'
import { VLoading } from './v_loading'

export const VActiveTab: () => ReactElement = observer(() => {
  const appState = useAppState()
  if (appState.state !== AppStates.APP_ACTIVE) {
    return <VLoading />;
  }
  return (
    <main className={'wrapperС ' + classes.VActiveTab}>
      {appState.currentTab === ObjActionTypes.ACTION_TRAVEL && (
        <VObjList
          cbGetObjList={() =>
            Array.from(iList.values()).filter((o) => o.type === 'place')
          }
          action={ObjActionTypes.ACTION_TRAVEL}
        />
      )}
      {appState.currentTab === ObjActionTypes.ACTION_BUY && (
        <VObjList
          cbGetObjList={() =>
            Array.from(oList.values()).filter((o) => !o.unlocked)
          }
          action={ObjActionTypes.ACTION_BUY}
        />
      )}{' '}
      {appState.currentTab === ObjActionTypes.ACTION_PERFORM && (
        <VObjList
          cbGetObjList={() =>
            Array.from(iList.values()).filter((o) => o.type === 'action')
          }
          action={ObjActionTypes.ACTION_PERFORM}
        />
      )}
      {appState.currentTab === ObjActionTypes.ACTION_EQUIP && (
        <>
          <VOutfit />
          <VObjList
            cbGetObjList={() =>
              Array.from(iList.values()).filter((o) => o.type === 'outfit')
            }
            action={ObjActionTypes.ACTION_EQUIP}
          />
        </>
      )}
    </main>
  )
})
