import classes from './v_placeinfo.module.css'
import { useGameState } from '../model/store.gamestate'
import { observer } from 'mobx-react-lite'

export const VPlaceInfo = observer(() => {
  const gameState = useGameState()

  return (
    <div className={classes.VPlaceInfo}>
      {gameState.currentPlace && (
        <>
          <img
            className={classes.VPlaceInfoImg}
            src={gameState.currentPlace.picture}
            alt=""
          />
          <h2>{gameState.currentPlace.caption}</h2>
          <h3>{gameState.currentPlace.comment}</h3>{' '}
        </>
      )}
    </div>
  )
})
