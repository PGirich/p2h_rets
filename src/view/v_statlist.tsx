import classes from './v_statlist.module.css'
import VProgress from './v_progress'
import CStat from '../model/m_stat'
import CObj from '../model/m_obj'
import { useShedule } from './v_shedule.context'

interface propsVStatList {
  cbGetObjList: () => Array<CObj> // получение массива объектов
}
export default function VStatList(props: propsVStatList) {
  const { currentTime } = useShedule()
  const objList: Array<CStat> = props.cbGetObjList() as unknown as Array<CStat>
  return (
    <div className={classes.VStatList}>
      {currentTime}
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
