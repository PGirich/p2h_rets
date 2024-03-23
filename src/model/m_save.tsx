import { globalGameState } from './store.gamestate'

export default function saveData() {
  const data = {
    name: 'test',
    age: 18,
  }
  localStorage.setItem('savedData', JSON.stringify(data))
}
