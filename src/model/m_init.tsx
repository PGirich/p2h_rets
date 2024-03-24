import CPlace from './m_place'
import CShop from './m_shop'
import CAction from './m_action'
import CStat from './m_stat'
import CItem from './m_item'
import COutfit from './m_outfit'
import { OutfitType } from './m_effect'
import { globalGameState } from './store.gamestate'
import { oList } from './m_data'

//////////////////////////////////////

export const ACTION_LIVE = 'action_live'
export const PLACE_VILLAGE = 'place_village'
export const ACTION_REST = 'action_rest'
export const STAT_AGE = 'stat_age'
export const STAT_AGE_MONTH_LENGTH = 10
export const STAT_AGE_REBORN = 6 * 12 * STAT_AGE_MONTH_LENGTH
export const STAT_WEIGHT = 'stat_weight'

export default function loadMetaData() {
  console.log('Start metadata loading...')
  let mo: any

  mo = new CAction(
    ACTION_LIVE,
    'Live life',
    'You breathe, recovering and getting older'
  )
  mo.resTic = [{ prop: 'stat_stamina', add: 0.025 }]
  mo.unlock()

  // places

  mo = new CPlace(
    'place_innerworld', //mage inner world
    'Inner world',
    'In meditation you get here everytime'
  )

  // начало истории - маленькая деревня, делать тут нечего
  mo = new CPlace(
    PLACE_VILLAGE,
    'Small village',
    'Small village, in the far edge of the world'
  )
  mo.unlock()

  mo = new CPlace('place_forest', 'Forest', 'Forest near small village')
  mo.unlock()
  mo = new CPlace('place_river', 'River', 'River near small village')
  mo.unlock()
  mo = new CPlace('place_mount', 'Mount', 'Mount near small village')
  mo.unlock()

  mo = new CShop(
    'shop_villageshop',
    'Village trader',
    'Local trader sells junk to fellow peasants',
    'place_villageshop'
  )
  mo.unlock()
  mo = new CShop(
    'shop_witchshop',
    'Witch hut',
    'Local witch sells herb in her small hut',
    'place_forest'
  )
  mo.unlock('place_forest')

  // stats

  mo = new CStat('stat_stamina', 'stamina', 'Are you tired?')
  mo.color = 'darkorange'
  mo.max = 8
  mo.unlock()

  mo = new CStat('stat_vitality', 'vitality', 'Good health is above wealth')
  mo.color = 'red'
  mo.max = 8
  mo.unlock()

  mo = new CStat('stat_will', 'will', 'Where there’s a will there’s a way')
  mo.color = 'teal'
  mo.max = 8
  mo.unlock()

  mo = new CStat(
    STAT_AGE,
    'age',
    'We turn not older with years, but newer every day'
  )
  mo.color = 'olive'
  mo.max = 250000
  mo.unlock()

  mo = new CStat(
    STAT_WEIGHT,
    "Wearing item's weight",
    'In meditation you get here everytime'
  )
  mo.color = 'green'
  mo.max = 25
  mo.unlock()

  // items

  mo = new CItem(
    'item_gold', // small hill of ancient gold coins on white background
    'gold',
    'A heavy purse makes a light heart'
  )
  mo.count = 5
  mo.unlock()

  mo = new COutfit(
    'outfit_torn_rags', // ancient  torn vest on white background
    'torn rags',
    'Dirty torn rags do not keep you warm',
    OutfitType.OUTFIT_ROBE
  )
  mo.count = 1
  mo.unlock()

  // ====================================================
  // actions
  // condBuy: условия покупки
  // condUse: условия доступности
  // resUse: итоговые результаты действия
  // resTic: изменения от действия в секунду
  // actionLength: длительность действия в секундах
  // count: количество

  mo = new CAction(
    ACTION_REST, // old Chinese tea set with fog on white background
    'Rest',
    'How beautiful it is to do nothing, and then rest afterward'
  )
  mo.resTic = [{ prop: 'stat_stamina', add: 0.1 }]
  mo.resUse = [{ prop: 'stat_stamina', add: 1 }]
  mo.actionLength = 10
  mo.unlock()

  mo = new CAction(
    'action_cleaning', // old Chinese broom on white background
    'Cleaning job',
    'You can get some charity for cleaninf street from random housewife'
  )
  mo.resTic = [{ prop: 'stat_stamina', add: -0.1 }]
  mo.resUse = [{ prop: 'item_gold', add: 1 }]
  mo.actionLength = 40
  mo.unlock()

  mo = new CAction('action_begging', 'Begging', 'Begging passersby for money')
  mo.resTic = [
    { prop: 'item_gold', add: 0.01 },
    { prop: 'stat_stamina', add: -0.025 },
  ]
  mo.resUse = [{ prop: 'stat_stamina', add: 1 }]
  mo.actionLength = 100
  mo.unlock()

  mo = new CAction(
    'action_learning_reading', // old Chinese book and writing feather on white background
    'learning reading',
    'learning how to read with old teacher'
  )
  mo.condUse = [{ prop: 'stat_filth', op: `<`, val: 1 }]
  mo.resUse = [{ prop: 'scholar', add: 0.01 }]
  mo.resTic = [{ prop: 'stat_stamina', add: 0.3 }]
  mo.actionLength = 200
  mo.unlock('place_village')

  globalGameState.setCurrentPlace(
    oList.get(PLACE_VILLAGE)! as unknown as CPlace
  )
  globalGameState.setCurrentRestAction(oList.get(ACTION_REST)! as CAction)

  console.log('Metadata loaded.')
}
