import classes from './v_statlist.module.css'
import VProgress from './v_progress'
import CStat from '../model/m_stat'
import CObj from '../model/m_obj'
import { timeToYearStr } from '../model/m_data'
import { useGameState } from '../model/store.gamestate'
import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

interface propsVStatList {
  cbGetObjList: () => Array<CObj> // получение массива объектов
}
export const VStatList: (props: propsVStatList) => ReactElement = observer(
  (props) => {
    const gameState = useGameState()
    const objList: Array<CStat> =
      props.cbGetObjList() as unknown as Array<CStat>
    return (
      <div className={classes.VStatList}>
        {timeToYearStr(gameState.currentAge)}
        {objList.map((stat, idx) => (
          <div className={classes.VStatListEntryBox} key={stat.name}>
            <VProgress value={stat.count} max={stat.max} color={stat.color}>
              {stat.caption}
            </VProgress>
            <span>{stat.max}</span>
          </div>
        ))}
      </div>
    )
  }
)
