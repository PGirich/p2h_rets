import classes from './v_placeinfo.module.css'
import { useObj } from './v_obj.context'

export default function VPlaceInfo() {
  const { currentPlace } = useObj()
  
  return (
    <div className={classes.VPlaceInfo}>
      {currentPlace && (<>
      <img className={classes.VPlaceInfoImg} src={currentPlace.picture} alt="" />
      <h1>{currentPlace.caption}</h1>
      <h2>{currentPlace.comment}</h2>{' '}
      </>)}
    </div>
  )
}
