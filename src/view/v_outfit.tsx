import classes from './v_outfit.module.css'
import { outfitSlotTypes, OutfitType } from '../model/m_effect'
import { useGameState } from '../model/store.gamestate'
import COutfit from '../model/m_outfit'

interface propsVOutift {
  slotType: OutfitType
  obj: COutfit | undefined
}
export const VOutfit: React.FC<propsVOutift> = (props) => {
  const gameState = useGameState()
  const { slotType, obj } = props
  return (
    <div className={classes.VOutfit}>
      {obj && (
        <>
          <h4>
            {slotType}:<em>{obj.weight}</em>
          </h4>
          <div className={classes.VOutfitEmpty}>
            <img src={obj.picture} className={classes.VOutfitImg} />
          </div>
          <h6>{obj.caption}</h6>
        </>
      )}
      {!obj && (
        <>
          <h4>{slotType}:</h4>
          <div className={classes.VOutfitEmpty}> </div>
          <h5>{'No item'}</h5>
        </>
      )}
    </div>
  )
}
