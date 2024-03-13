import classes from './v_outfit.module.css'
import { useOutfit } from './v_outfit.context'
import { actList } from '../model/m_data'

export default function VOutfit() {
  const { outfit, setOutfit } = useOutfit()

  return (
    <div className={classes.VOutfit}>
      {outfit.map((act, idx) => (
        <div className={classes.VSheduleEntryBox} key={idx}>
              {act!.caption}
        </div>
      ))}
    </div>
  )
}
