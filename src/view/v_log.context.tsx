import React, { useEffect, useRef, useState } from 'react'

export default function VLogContext() {
  const [olog, setToLog] = useState({ str: '', type: '' })
  const arrLog = useRef(new Array<string>())
  useEffect(() => {
    arrLog.current.unshift(olog.str)
    return
  }, [olog])

  const logcontext = React.createContext({
    logAction: (s: string) => {
      arrLog.current.unshift(s)
    },
  })
  return
}
