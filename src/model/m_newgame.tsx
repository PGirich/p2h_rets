import { globalGameState } from './store.gamestate'

export default function initNewGame() {
  console.log('New game data preparing...')
  globalGameState.setShedule([])
  console.log('New game data prepared succesfully.')
}
