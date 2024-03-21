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
          <h1>{gameState.currentPlace.caption}</h1>
          <h2>{gameState.currentPlace.comment}</h2>{' '}
        </>
      )}
    </div>
  )
})
