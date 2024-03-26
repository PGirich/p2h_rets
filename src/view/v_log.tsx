import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
  useCallback,
} from 'react'
import classes from './v_log.module.css'
import {
  LogEvent,
  LoggedEventTypes,
  useGameState,
} from '../model/store.gamestate'
import { observer } from 'mobx-react-lite'

//=========================================
// чекбокс меняет состояние фильтра журнала
interface propsVLogFilter {
  ld: LoggedEventTypes
  value: boolean
  cbChange: (le: LoggedEventTypes) => void
  children: ReactNode
}
function VLogFilter(props: propsVLogFilter) {
  const { cbChange, ld } = props
  const cbChangeHandler: ChangeEventHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      cbChange(ld)
    },
    [cbChange, ld]
  )
  return (
    <>
      <input
        type="checkbox"
        className={classes.VLogCheckBox}
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
export const VLog = observer(() => {
  const gameState = useGameState()

  // состояния фильтра журнала
  const aLoggedEventTypes = [
    LoggedEventTypes.LOGGED_ACTIONS,
    LoggedEventTypes.LOGGED_LOOT,
    LoggedEventTypes.LOGGED_UNLOCK,
    LoggedEventTypes.LOGGED_BATTLE,
  ]
  // фильтры по типам операций
  const [evTypesToHide, setEvTypesToHide] = useState(
    new Set<LoggedEventTypes>(aLoggedEventTypes)
  )
  // toggle filter
  function toggleEvTypes(set: Set<LoggedEventTypes>, v: LoggedEventTypes) {
    set.has(v) ? set.delete(v) : set.add(v)
    return set
  }
  // изменение фильтра
  const cbChangeFilter = (et: LoggedEventTypes) => {
    setEvTypesToHide((etth) => {
      const clone = new Set(etth)
      return toggleEvTypes(clone, et)
    })
  }

  // преставление операции для журнала
  function logDataToStr(ld: LogEvent): string {
    return (
      new Date(ld.when).toLocaleString() +
      ': ' +
      (ld.obj ? '[' + ld.obj.caption + '] ' : '') +
      ld.str +
      (ld.count > 1 ? ' (' + ld.count + ')' : '')
    )
  }

  // очистка логов
  const btClearClickHandler: MouseEventHandler = (e) => {
    gameState.clearLog()
    gameState.toLog(LoggedEventTypes.LOGGED_ACTIONS, 'log cleared...')
  }

  return (
    <div className={classes.VLog}>
      <button
        className="button"
        onClick={btClearClickHandler}
        disabled={gameState.log.length === 0}
      >
        CLEAR
      </button>
      {aLoggedEventTypes.map((et) => (
        <VLogFilter
          key={et}
          ld={et}
          value={evTypesToHide.has(et)}
          cbChange={cbChangeFilter}
        >
          {et}
        </VLogFilter>
      ))}

      <h5 key={'log'}>
        Log at {new Date(gameState.currentTime).toLocaleString()}
      </h5>
      {gameState.log
        .filter((le) => evTypesToHide.has(le.type))
        .map((le, idx) => (
          <h4 key={idx} className={classes.VLogEntry}>
            {logDataToStr(le)}
          </h4>
        ))}
    </div>
  )
})
