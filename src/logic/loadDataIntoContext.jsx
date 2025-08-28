import Classes from '../data/classes';
import Subclasses from '../data/subclasses';
import Races from '../data/races';
import Subraces from '../data/subraces';

export function loadDataIntoIdentity(_charIdentity) {
    const raceObj = findByField(Races, "Race", _charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", _charIdentity.Subrace);
    const classObj = findByField(Classes, "name", _charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", _charIdentity.Subclass);
    const characterIdentity = {
        Name: _charIdentity.Name,
        Race: _charIdentity.Race,
        Subrace: _charIdentity.Subrace,
        Class: _charIdentity.Class,
        Subclass: _charIdentity.Subclass,
        Level: _charIdentity.Level,

        languages: [
            "Common",
            ...(raceObj?.languages || []),
            ...(subraceObj?.languages || []),
            ...(classObj?.languages || []),
            ...(subclassObj?.languages || []),
        ],

        baseHP:
            (raceObj?.baseHP ?? 0) +
            (subraceObj?.baseHP ?? 0) +
            (classObj?.baseHP ?? 0) +
            (subclassObj?.baseHP ?? 0),

        hitDie:
            (raceObj?.hitDie ?? 0) +
            (subraceObj?.hitDie ?? 0) +
            (classObj?.hitDie ?? 0) +
            (subclassObj?.hitDie ?? 0),

        armorProf: [
            ...(raceObj?.armorProf || []),
            ...(subraceObj?.armorProf || []),
            ...(classObj?.armorProf || []),
            ...(subclassObj?.armorProf || []),
        ],

        weaponProf: [
            ...(raceObj?.weaponProf || []),
            ...(subraceObj?.weaponProf || []),
            ...(classObj?.weaponProf || []),
            ...(subclassObj?.weaponProf || []),
        ],

        toolProf: [
            ...(raceObj?.toolProf || []),
            ...(subraceObj?.toolProf || []),
            ...(classObj?.toolProf || []),
            ...(subclassObj?.toolProf || []),
        ],
        abilities: [
            ...(raceObj?.abilities || []),
            ...(subraceObj?.abilities || []),
            ...(classObj?.abilities || []),
            ...(subclassObj?.abilities || []),
        ],

        spells: [
            ...(raceObj?.spells || []),
            ...(subraceObj?.spells || []),
            ...(classObj?.spells || []),
            ...(subclassObj?.spells || []),
        ],
    };
    console.log("abilities after loading:");
    console.log(characterIdentity.abilities);
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
    const charChoices = {
        skillChoice: (raceObj?.skillChoice ?? 0) +
                    (subraceObj?.skillChoice ?? 0) +
                    (classObj?.skillChoice ?? 0) +
                    (subclassObj?.skillChoice ?? 0),
                    
        toolChoice: (raceObj?.toolChoice ?? 0) +
                    (subraceObj?.toolChoice ?? 0) +
                    (classObj?.toolChoice ?? 0) +
                    (subclassObj?.toolChoice ?? 0),

        languageChoice: (raceObj?.languageChoice ?? 0) +
                    (subraceObj?.languageChoice ?? 0) +
                    (classObj?.languageChoice ?? 0) +
                    (subclassObj?.languageChoice ?? 0),

        cantripChoice: (raceObj?.cantripChoice ?? 0) +
                    (subraceObj?.cantripChoice ?? 0) +
                    (classObj?.cantripChoice ?? 0) +
                    (subclassObj?.cantripChoice ?? 0),

        spell1Choice: (raceObj?.spell1Choice ?? 0) +
                    (subraceObj?.spell1Choice ?? 0) +
                    (classObj?.spell1Choice ?? 0) +
                    (subclassObj?.spell1Choice ?? 0),
    };
    return charChoices;
}
export function loadDataIntoInventory(charIdentity){
    console.log("loadDataIntoInventory is being called");
    const raceObj = findByField(Races, "Race", charIdentity.Race);
    const subraceObj = findByField(Subraces, "Subrace", charIdentity.Subrace);
    const classObj = findByField(Classes, "name", charIdentity.Class);
    const subclassObj = findByField(Subclasses, "name", charIdentity.Subclass);
    const inventory = [
            ...(raceObj?.startingInventory || []),
            ...(subraceObj?.startingInventory || []),
            ...(classObj?.startingInventory || []),
            ...(subclassObj?.startingInventory || [])
        ];
    console.log(inventory);
    return inventory;
}

function findByField(array, field, value) {
    return array.find(item => item[field] === value);
}