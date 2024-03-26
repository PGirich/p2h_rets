import classes from './v_outfit.module.css'
import { outfitSlotTypes } from '../model/m_effect'
import { useGameState } from '../model/store.gamestate'
import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import { VOutfit } from './v_outfit'

export const VOutfitList: () => ReactElement = observer(() => {
  const gameState = useGameState()
  return (
    <div className={classes.VOutfitList}>
      {outfitSlotTypes.map((slotType, idx) => (
        <VOutfit key={idx} slotType={slotType} obj={gameState.outfit[idx]} />
      ))}
    </div>
  )
})
