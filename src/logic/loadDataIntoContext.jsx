import Classes from '../data/classes';
import Subclasses from '../data/subclasses';
import Races from '../data/races';
import Subraces from '../data/subraces';
import Backgrounds from '../data/backgrounds';
import { ItemList } from '../data/itemList';

export function loadDataIntoIdentity(_charIdentity) {
    const raceObj = findByField(Races, "Race", _charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", _charIdentity.Subrace);
    const classObj = findByField(Classes, "name", _charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", _charIdentity.Subclass);
    const backgroundsObj = findByField(Backgrounds, "name", _charIdentity.Background);
    const characterIdentity = {
        Name: _charIdentity.Name,
        Race: _charIdentity.Race,
        Subrace: _charIdentity.Subrace,
        Class: _charIdentity.Class,
        Subclass: _charIdentity.Subclass,
        Background: _charIdentity.Background,
        Level: _charIdentity.Level,

        languages: [
            ...(raceObj?.languages || []),
            ...(subraceObj?.languages || []),
            ...(classObj?.languages || []),
            ...(subclassObj?.languages || []),
            ...(backgroundsObj?.languages || []),
        ],

        baseHP:
            (raceObj?.baseHP ?? 0) +
            (subraceObj?.baseHP ?? 0) +
            (classObj?.baseHP ?? 0) +
            (subclassObj?.baseHP ?? 0) +
            (backgroundsObj?.baseHP ?? 0),

        hitDie:
            (raceObj?.hitDie ?? 0) +
            (subraceObj?.hitDie ?? 0) +
            (classObj?.hitDie ?? 0) +
            (subclassObj?.hitDie ?? 0) +
            (backgroundsObj?.hitDie ?? 0),

        armorProf: [
            ...(raceObj?.armorProf || []),
            ...(subraceObj?.armorProf || []),
            ...(classObj?.armorProf || []),
            ...(subclassObj?.armorProf || []),
            ...(backgroundsObj?.armorProf || []),
        ],

        weaponProf: [
            ...(raceObj?.weaponProf || []),
            ...(subraceObj?.weaponProf || []),
            ...(classObj?.weaponProf || []),
            ...(subclassObj?.weaponProf || []),
            ...(backgroundsObj?.weaponProf || []),
        ],

        toolProf: [
            ...(raceObj?.toolProf || []),
            ...(subraceObj?.toolProf || []),
            ...(classObj?.toolProf || []),
            ...(subclassObj?.toolProf || []),
            ...(backgroundsObj?.toolProf || []),
        ],
        abilities: [
            ...(raceObj?.abilities || []),
            ...(subraceObj?.abilities || []),
            ...(classObj?.abilities || []),
            ...(subclassObj?.abilities || []),
            ...(backgroundsObj?.abilities || []),
        ],

        spells: [
            ...(raceObj?.spells || []),
            ...(subraceObj?.spells || []),
            ...(classObj?.spells || []),
            ...(subclassObj?.spells || []),
            ...(backgroundsObj?.spells || []),
        ],

        skills: [
            ...(raceObj?.skills || []),
            ...(subraceObj?.skills || []),
            ...(classObj?.skills || []),
            ...(subclassObj?.skills || []),
            ...(backgroundsObj?.skills || []),
        ],
    };
    return characterIdentity;
}
export function loadDataIntoResources(charIdentity) {
    const classObj = findByField(Classes, "name", charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", charIdentity.Subclass);
    const charResources = {
        max: classObj?.resources.map((val, index) => val + (subclassObj?.resources[index] ?? 0)),
        current: classObj?.resources.map((val, index) => val + (subclassObj?.resources[index] ?? 0)),
    };
    return charResources;
}
export function loadDataIntoAbilityScores(charIdentity) {
    const raceObj = findByField(Races, "Race", charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", charIdentity.Subrace);
    const charAbilityScores = {
        stats: [8,8,8,8,8,8],
        Remaining: 27,
        extraStats: raceObj?.extraStats.map((val, index) => val + (subraceObj?.extraStats[index]??0))
    };
    return charAbilityScores;
}
export function loadDataIntoChoices(charIdentity) {
    const raceObj = findByField(Races, "Race", charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", charIdentity.Subrace);
    const classObj = findByField(Classes, "name", charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", charIdentity.Subclass);
    const backgroundsObj = findByField(Backgrounds, "name", charIdentity.Background);
    const charChoices = {
        skillChoice: (raceObj?.skillChoice ?? 0) +
                    (subraceObj?.skillChoice ?? 0) +
                    (classObj?.skillChoice ?? 0) +
                    (subclassObj?.skillChoice ?? 0) +
                    (backgroundsObj?.skillChoice ?? 0),
                    
        toolChoice: (raceObj?.toolChoice ?? 0) +
                    (subraceObj?.toolChoice ?? 0) +
                    (classObj?.toolChoice ?? 0) +
                    (subclassObj?.toolChoice ?? 0) +
                    (backgroundsObj?.toolChoice ?? 0),

        languageChoice: (raceObj?.langChoice ?? 0) +
                    (subraceObj?.langChoice ?? 0) +
                    (classObj?.langChoice ?? 0) +
                    (subclassObj?.langChoice ?? 0) +
                    (backgroundsObj?.langChoice ?? 0),

        cantripChoice: (raceObj?.cantripChoice ?? 0) +
                    (subraceObj?.cantripChoice ?? 0) +
                    (classObj?.cantripChoice ?? 0) +
                    (subclassObj?.cantripChoice ?? 0) +
                    (backgroundsObj?.cantripChoice ?? 0),

        spell1Choice: (raceObj?.spell1Choice ?? 0) +
                    (subraceObj?.spell1Choice ?? 0) +
                    (classObj?.spell1Choice ?? 0) +
                    (subclassObj?.spell1Choice ?? 0) +
                    (backgroundsObj?.spell1Choice ?? 0),
    };
    return charChoices;
}
export function loadDataIntoInventory(charIdentity){
    const raceObj = findByField(Races, "Race", charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", charIdentity.Subrace);
    const classObj = findByField(Classes, "name", charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", charIdentity.Subclass);
    const backgroundsObj = findByField(Backgrounds, "name", charIdentity.Background);
    const inventoryWDupes = [
            ...(raceObj?.startingInventory ? loadItemsIntoArray(raceObj.startingInventory) : []),
            ...(subraceObj?.startingInventory ? loadItemsIntoArray(subraceObj.startingInventory) : []),
            ...(classObj?.startingInventory ? loadItemsIntoArray(classObj.startingInventory) : []),
            ...(subclassObj?.startingInventory ? loadItemsIntoArray(subclassObj.startingInventory) : []),
            ...(backgroundsObj?.startingInventory ? loadItemsIntoArray(backgroundsObj.startingInventory) : [])
        ];
    const inventoryMap = {};
    inventoryWDupes.map(item => {
        if (inventoryMap[item.name]){
            inventoryMap[item.name].quantity += item.quantity;
        } else {
            inventoryMap[item.name] = { ...item };
        }
    })
    const inventory = Object.values(inventoryMap)
    return inventory;
}
export function resetEquipment(){
    return {
        head: "none",
        armor: "none",
        boots: "none",
        gloves: "none",
        amulet: "none",
        ring1: "none",
        ring2: "none",
        hand1: "none",
        hand2: "none"
    }
}

function findByField(array, field, value) {
    return array.find(item => item[field] === value);
}

function loadItemsIntoArray(startingArray){
    const returnArray = startingArray.map(item => {
        const details= ItemList[item.item];
        return {
            ...details,
            name:details.display,
            quantity:item.quantity
        };
    });
    return returnArray;
}