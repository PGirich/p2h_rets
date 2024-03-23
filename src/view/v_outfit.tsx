import classes from './v_outfit.module.css'
import { outfitSlotTypes } from '../model/m_effect'
import { useGameState } from '../model/store.gamestate'
import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

export const VOutfit: () => ReactElement = observer(() => {
  const gameState = useGameState()
  return (
    <div className={classes.VOutfit}>
      {outfitSlotTypes.map((slotType, idx) => (
        <div className={classes.VOutfitEntryBox} key={idx}>
          {slotType}:{' '}
          {gameState.outfit[idx] ? gameState.outfit[idx]!.caption : 'no item'}
        </div>
      ))}
    </div>
  )
})
