import React, { useState } from 'react'
import CObj from '../model/m_obj'

interface propsVObj {
  obj : CObj
}
export default function VObj(props:propsVObj) {
  return (
    <div className="VObj">
      <div>Object {props.obj.caption} </div>
    </div>
  )
}
