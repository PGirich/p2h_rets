import CObj from './m_obj.js'
import CMap from './m_map.js'
import CShop from './m_shop.js'
import CAction from './m_action.js'
import { CMenuShop, CMenuAction } from './c_menu.jsx'

//////////////////////////////////////

export default function loadMetaData() {
  console.log('Start metadata loading...')

  // меню
  let mo : any = new CMenuShop(
    'menu_chart',
    'Travel',
    'Known places, which you able to reach...',
    'chart' // показывает места доступные для путешествия
  ).unlock('menu')
  mo = new CMenuShop(
    'menu_shop',
    'Shops',
    'You can get things and knowledge here...',
    'shop' // показывает доступные магазины
  ).unlock('menu')
  mo = new CMenuAction(
    'menu_action',
    'Tasks',
    'You can select task here to do...',
    'inborn' // показывает доступные для выполнения действия
  ).unlock('menu')

  // доступные места
  mo = new CMap('chart_hero', 'You', 'I am here everywhere everytime').unlock(
    'chart'
  )
  mo = new CMap(
    'chart_village',
    'Small village',
    'Small village, in the far edge of the world'
  ).unlock('chart')
  mo = new CMap('chart_forest', 'Forest', 'Forest near small village').unlock(
    'chart'
  )

  // доступные магазины
  mo = new CShop(
    'shop_places',
    'Available places',
    'You know, how to get there',
    ''
  ).unlock('shop')

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
