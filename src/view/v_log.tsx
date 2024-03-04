import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
  useCallback,
} from 'react'
import classes from './v_log.module.css'
import { LogData, LogTypes, useLog } from './v_log.context'

//=========================================
// чекбокс меняет состояние фильтра журнала
interface propsVLogFilter {
  ld: LogTypes
  value: boolean
  cbChange: (ld: LogTypes) => void
  children: ReactNode
}
function VLogFilter(props: propsVLogFilter) {
  const cbChangeHandler: ChangeEventHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.cbChange(props.ld)
    },
    [props.cbChange]
  )
  return (
    <>
      <input
        type="checkbox"
        id={'cb' + props.ld}
        checked={props.value}
        onChange={cbChangeHandler}
      ></input>
      <label htmlFor={'cb' + props.ld}>{props.children}</label>
    </>
  )
}

//=========================================
// компонент журнала
export default function VLog() {
  const appLog = useLog()

  // фильтры по типам операций
  const [logTypesToHide, setLogTypesToHide] = useState(
    new Set<LogTypes>([
      LogTypes.TYPE_ACTIONS,
      LogTypes.TYPE_LOOT,
      LogTypes.TYPE_UNLOCK,
      LogTypes.TYPE_BATTLE,
    ])
  )

  // преставление операции для журнала
  function logDataToStr(ld: LogData): string {
    return (
      new Date(ld.when).toLocaleString() +
      ': ' +
      (ld.obj ? '[' + ld.obj.caption + '] ' : '') +
      ld.str +
      (ld.val > 1 ? ' (' + ld.val + ')' : '')
    )
  }

  // очистка логов
  const btClearClickHandler: MouseEventHandler = (e) => {
    const emptyLD: LogData = {
      type: LogTypes.TYPE_ACTIONS,
      when: Date.now(),
      obj: undefined,
      str: 'log cleared...',
      val: 1,
    }
    appLog.arr!.current = new Array<LogData>()
    appLog.toLog(emptyLD)
  }
  // toggle filter
  function toggleLogTypes(set: Set<LogTypes>, v: LogTypes) {
    set.has(v) ? set.delete(v) : set.add(v)
    return set
  }
  // изменение фильтра
  const cbChangeFilter = (ld: LogTypes) => {
    setLogTypesToHide((ltth) => {
      const clone = new Set(ltth)
      return toggleLogTypes(clone, ld)
    })
  }

  return (
    <div className={classes.VLog}>
      <button
        className="button"
        onClick={btClearClickHandler}
        disabled={appLog.arr!.current.length === 0}
      >
        CLEAR
      </button>

      <VLogFilter
        ld={LogTypes.TYPE_ACTIONS}
        cbChange={cbChangeFilter}
        value={logTypesToHide.has(LogTypes.TYPE_ACTIONS)}
      >
        actions
      </VLogFilter>

      <VLogFilter
        ld={LogTypes.TYPE_LOOT}
        cbChange={cbChangeFilter}
        value={logTypesToHide.has(LogTypes.TYPE_LOOT)}
      >
        loot
      </VLogFilter>
      <VLogFilter
        ld={LogTypes.TYPE_UNLOCK}
        cbChange={cbChangeFilter}
        value={logTypesToHide.has(LogTypes.TYPE_UNLOCK)}
      >
        unlock
      </VLogFilter>
      <VLogFilter
        ld={LogTypes.TYPE_BATTLE}
        cbChange={cbChangeFilter}
        value={logTypesToHide.has(LogTypes.TYPE_BATTLE)}
      >
        battle
      </VLogFilter>
      <div key={'log'}>Log at {new Date(appLog.state).toLocaleString()}</div>
      {appLog.arr!.current
        .filter((ld) => logTypesToHide.has(ld.type))
        .map((ld,idx) => (
          <div key={idx} className={classes.VLogEntry} >{logDataToStr(ld)}</div>
        ))}
    </div>
  )
}
