import armors from "./items/armors.json"
import backgroundItems from "./items/backgroundItems.json"
import items from "./items/items.json"
import weapons from "./items/weapons.json"

export const ItemList = {
    ...armors,
    ...backgroundItems,
    ...items,
    ...weapons
}