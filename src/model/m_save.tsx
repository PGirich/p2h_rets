import { oList } from './m_data'
import { globalGameState } from './store.gamestate'

// карта дескриторов для типов CObj
export const objPropsToSave : Map<string,string> = new Map()

// сохранение данных игры
export default function saveData() {
  // формируем объект для сохранения
  function getDataFromKeys(keys: Array<string>, obj: any) {
    let data: any = {}
    keys.forEach((key) => {
      data[key] = obj[key]
    })
    return data
  }
  // итерируем все разлоченные объекты
  const saveData: any = new Map()
  for (let obj of oList.values()) {
    let kts = objPropsToSave.get(obj.type) || objPropsToSave.get('default')
    if (kts && kts !== '') {
      saveData[obj.name] = getDataFromKeys(kts.split(','), obj)
    }
  }
  // сохраняем глобальные данные игры
  const g = globalGameState
  saveData['currentPlace'] = g.currentPlace.name
  saveData['currentAge'] = g.currentAge
  // в хранилище
  localStorage.setItem('savedData', JSON.stringify(saveData))
  console.log(saveData)
}
