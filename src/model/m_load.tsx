import { useEffect } from 'react'
import { globalGameState } from './store.gamestate'

export default function loadSavedData() {
  console.log('Start saved data loading...')
  const savedData = localStorage.getItem('savedData')
  if (savedData) {
    JSON.parse(savedData)
    console.log('Saved data loaded successfully.')
    return true
  }
  console.log('Saved data not loaded.')
  return false
}
