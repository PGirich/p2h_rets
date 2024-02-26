import React from 'react'
import useCreateHeroContext from './hero.context'

const Context = React.createContext(null)

export const HeroContextProvider = ({ children, ...props }) => {
  const context = useCreateHeroContext(props)
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export function useHeroContext() {
  const context = React.useContext(Context)
  if (!context) throw new Error('Use app context within provider!')
  return context
}
