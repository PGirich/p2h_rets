import classes from './v_outfit.module.css'
import { useOutfit } from './v_outfit.context'
import { actList } from '../model/m_data'
import { OutfitType, outfitSlotTypes } from '../model/m_effect'

export default function VOutfit() {
  const { outfit, setOutfit } = useOutfit()

  return (
    <div className={classes.VOutfit}>
      {outfit.map((o, idx) => (
        <div className={classes.VOutfitEntryBox} key={idx}>
          {o ? o.caption : outfitSlotTypes[idx]}
        </div>
      ))}
    </div>
  )
}
