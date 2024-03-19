import classes from './v_outfit.module.css'
import { useOutfit } from './v_outfit.context'
import { outfitSlotTypes } from '../model/m_effect'

export default function VOutfit() {
  const { outfit /*, setOutfit*/ } = useOutfit()
  return (
    <div className={classes.VOutfit}>
      {outfitSlotTypes.map((slotType, idx) => (
        <div className={classes.VOutfitEntryBox} key={idx}>
          {slotType}: {(outfit[idx]) ? outfit[idx]!.caption : 'no item'}
        </div>
      ))}
    </div>
  )
}
