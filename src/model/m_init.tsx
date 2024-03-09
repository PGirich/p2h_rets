import CPlace from './m_place'
import CShop from './m_shop'
import CAction from './m_action'
import CStat from './m_stat'

//////////////////////////////////////

export const ACTION_LIVE = 'action_live'
export const PLACE_VILLAGE = 'place_village'
export const ACTION_REST = 'action_rest'
export const STAT_AGE = 'stat_age'

export default function loadMetaData() {
  console.log('Start metadata loading...')
  let mo: any

  mo = new CAction(
    ACTION_LIVE,
    'Live life',
    'You breathe, recovering and getting older'
  )
  mo.unlock()

  // начало истории - маленькая деревня, делать тут нечего

  mo = new CPlace(
    PLACE_VILLAGE,
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
  mo = new CShop(
    'shop_witchshop',
    'Witch hut',
    'Local witch sells herb in her small hut',
    'place_forest'
  ).unlock('shop')

  mo = new CPlace(
    'place_innerworld',
    'Inner world',
    'In meditation you get here everytime'
  )

  // ====================================================
  // stats
  mo = new CStat('stat_gold', 'gold', 'A heavy purse makes a light heart')
  mo.color = 'gold'
  mo.unlock()

  mo = new CStat('stat_stamina', 'stamina', 'Are you tired?')
  mo.color = 'darkorange'
  mo.unlock()

  mo = new CStat('stat_vitality', 'vitality', 'Good health is above wealth')
  mo.color = 'red'
  mo.unlock()

  mo = new CStat(
    STAT_AGE,
    'age',
    'We turn not older with years, but newer every day'
  )
  mo.color = 'olive'
  mo.max = 250000
  mo.unlock()

  // ====================================================
  // actions
  mo = new CAction(
    ACTION_REST,
    'Rest',
    'How beautiful it is to do nothing, and then rest afterward'
  )
  mo.resUse = [{ prop: 'stamina', cost: 0.1 }]
  mo.actionLength = 1
  mo.unlock()

  mo = new CAction(
    'action_cleaning',
    'Cleaning job',
    'You can get some charity for cleaninf street from random housewife'
  )
  mo.resUse = [{ prop: 'gold', cost: 1 }]
  mo.resTic = [{ prop: 'stamina', cost: 0.5 }]
  mo.actionLength = 4
  mo.unlock()

  mo = new CAction('action_begging', 'Begging', 'Begging passersby for money')
  mo.resUse = [{ prop: 'gold', cost: 0.01 }]
  mo.resTic = [{ prop: 'stamina', cost: 0.3 }]
  mo.actionLength = 8
  mo.unlock()

  mo = new CAction(
    'learning_reading',
    'learning reading',
    'learning how to read with old teacher'
  ).unlock('village')
  mo.condUse = [{ prop: 'filth', op: `<`, val: 1 }]
  mo.resUse = [{ prop: 'scholar', cost: 0.01 }]
  mo.resTic = [{ prop: 'stamina', cost: 0.3 }]
  mo.actionLength = 200

  console.log('Metadata loaded.')
}
