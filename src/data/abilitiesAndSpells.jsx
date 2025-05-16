import actives from './spellsAndSkills/actives.json'
import passives from './spellsAndSkills/passives.json'
import cantrips from './spellsAndSkills/cantrips.json'
import spells1 from './spellsAndSkills/spells1.json'

const abilitiesAndSpells = {
  ...actives,
  ...passives,
  ...cantrips,
  ...spells1
};
export default abilitiesAndSpells