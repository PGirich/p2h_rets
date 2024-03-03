import {  useState } from 'react'
import classes from './v_placeinfo.module.css'
import { oList } from '../model/m_data'

export default function VPlaceInfo() {
  const [currentPlace, setCurrentPlace] = useState(oList.get('place_village')!)

  return (
    <div className={classes.VPlaceInfo}>
      <img className={classes.VPlaceInfoImg} src={currentPlace.picture} />
      <h1>{currentPlace.caption}</h1>
      <h2>{currentPlace.comment}</h2>{' '}
    </div>
  )
}
