import CObj from './m_obj'
import { oList } from './m_data'
import CPlace from './m_place'
import CShop from './m_shop'
import CAction from './m_action'
import { CMenuShop, CMenuAction } from './c_menu.jsx'

//////////////////////////////////////

export default function loadMetaData() {
  console.log('Start metadata loading...')
  let mo: any

  // начало истории - маленькая деревня, делать тут нечего

  mo = new CPlace(
    'place_village',
    'Small village',
    'Small village, in the far edge of the world'
  ).unlock()
  mo = new CPlace(
    'place_forest',
    'Forest',
    'Forest near small village'
  ).unlock()
  mo = new CPlace('place_river', 'River', 'River near small village').unlock()
  mo = new CPlace('place_mount', 'Mount', 'Mount near small village').unlock()

  mo = new CShop(
    'shop_villageshop',
    'Village trader',
    'Local trader sells junk to fellow peasants',
    'place_villageshop'
  ).unlock()
  mo.picture = './place.villageshop.png'
  mo = new CShop(
    'shop_witchshop',
    'Witch hut',
    'Local witch sells herb in her small hut',
    'place_forest'
  ).unlock('shop')
  mo.picture = './place.witchshop.png'

  mo = new CAction(
    'action_cleaning',
    'Cleaning job',
    'You can get some charity for cleaninf street from random housewife'
  ).unlock('place_village')

  mo = new CPlace(
    'place_innerworld',
    'Inner world',
    'In meditation you get here everytime'
  )

  // ====================================================
  // actions
  mo = new CAction('begging', 'begging', 'begging passersby for money')
  mo.resUse = [{ prop: 'gold', cost: 0.01 }]
  mo.resTic = [{ prop: 'stamina', cost: 0.3 }]
  mo.actionLength = 8
  mo.unlock('inborn')

  mo = new CAction(
    'learning_reading',
    'learning reading',
    'learning how to read with old teacher'
  ).unlock('village')
  mo.condUse = [{ prop: 'filth', op: `<`, val: 1 }]
  mo.resUse = [
    { prop: 'scholar', cost: 0.01 },
    { prop: 'scholar', cost: 0.01 },
  ]
  mo.resTic = [{ prop: 'stamina', cost: 0.3 }]
  mo.actionLength = 200

  console.log('Metadata loaded.')
}
