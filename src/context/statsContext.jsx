import React, { createContext, useState } from "react";
import { loadDataIntoAbilityScores, loadDataIntoChoices, loadDataIntoIdentity, loadDataIntoInventory, loadDataIntoResources } from "../logic/loadDataIntoContext";
import Backgrounds from "../data/backgrounds";

export const StatsContext = createContext();
export function StatsProvider({ children }) {
    const [charIdentity, setCharIdentity] = useState({
        Name: "Nombre del personaje",
        Race: "none",
        Subrace: "none",
        Class: "none",
        Subclass:"none",
        Background:"none",
        Level: 1,
        languages: [],
        baseHP : 1,
        hitDie : 1,
        armorProf : [],
        weaponProf : [],
        toolProf : [],
        abilities : [],
        spells : [],
        skills : [],
    });

    const [charResources, setCharResources] = useState({
        max: [1,1,0,0,0,0,0,0,0,0,0],
        current: [1,1,0,0,0,0,0,0,0,0,0]
    });

    const [charAbilityScores, setCharAbilityScores] = useState({
        stats: [8,8,8,8,8,8],
        Remaining: 27,
        extraStats:[0,0,0,0,0,0]
    });

    const [charEquipment, setCharEquipment] = useState({
        ACA: 0,
        ACS: 0
    });

    const [charChoices, setCharChoices] = useState({
        skillChoice: 0,
        toolChoice: 0,
        languageChoice: 0,
        cantripChoice: 0,
        spell1Choice: 0,
    });

    const [ equipment, setEquipment ] = useState({
        head: "none",
        armor: "none",
        boots: "none",
        gloves: "none",
        amulet: "none",
        ring1: "none",
        ring2: "none",
        mWeapon: "none",
        shield: "none",
        rWeapon: "none",
    })

    const [ inventory, setInventory ] = useState([])

    const addItem = (item) => {
        setInventory(prevInventory => {
            const prevItem = prevInventory.find(_item => _item.name === item.name)
            if (prevItem) {
                return prevInventory.map(_item => _item.name === item.name ? {..._item,
                    quantity: _item.quantity + 1} : _item);}
            else {
                const newItem = item.quantity ? item : { ...item, quantity: 1 };
                return [...prevInventory, newItem];
            }
        });
    }
    const removeItem = (item) => {
        setInventory(prevInventory => 
            prevInventory.reduce((acc, _item) => {
                if(_item.name === item.name) {
                    if (_item.quantity > 1) {
                        acc.push({ ..._item, quantity: _item.quantity -1 });
                    } 
                }else {
                    acc.push(_item);
                }
                return acc;
            },[])
        );
    }

    const addAbility = (ability) => {
        setCharAbilityScores(prevStats => {
            const { stats, extraStats, Remaining } = prevStats;
            const currentValue = stats[ability];
            const extra = extraStats[ability];
            const totalValue = currentValue + extra;
            const cost = totalValue < 13 ? 1 : totalValue < 15 ? 2 : totalValue < 16 ? 3 : null;
            if (cost === null || Remaining < cost) return prevStats;
            return {
                ...prevStats,
                stats: stats.map((val, index) => index === ability ? val + 1 : val),
                Remaining: Remaining - cost
            };
        });
    };

    const subtractAbility = (ability) => {
        setCharAbilityScores(prevStats => {
            const { stats, extraStats, Remaining } = prevStats;
            const currentValue = stats[ability];
            const extra = extraStats[ability];
            const totalValue = currentValue + extra;
            const refund = totalValue > 15 ? 3 : totalValue > 13 ? 2 : currentValue > 8 ? 1 : null;
            if (refund === null) return prevStats;
            return {
                ...prevStats,
                stats: stats.map((val, index) => index === ability ? val - 1 : val),
                Remaining: Remaining + refund
            }
        });
    };

    const setRaceSubrace = (Stat, Value) => {
        let _charIdentity = charIdentity;
        if (Stat === "Race") {
            _charIdentity.Race = Value.Race;
            _charIdentity.Subrace = "none";
        }
        else {
            _charIdentity.Subrace = Value.Subrace;
        }
        setCharIdentity(loadDataIntoIdentity(_charIdentity));
        setCharAbilityScores(loadDataIntoAbilityScores(_charIdentity));
        setCharChoices(loadDataIntoChoices(_charIdentity));
        setInventory(loadDataIntoInventory(_charIdentity));
    };

    const setClass = (selected) => {
        let _charIdentity = charIdentity;
        _charIdentity.Class = selected.name;
        setCharIdentity(loadDataIntoIdentity(_charIdentity));
        setCharResources(loadDataIntoResources(_charIdentity));
        setCharChoices(loadDataIntoChoices(_charIdentity));
        setInventory(loadDataIntoInventory(_charIdentity));
    }

    const setBackground = (selected) => {
        let _charIdentity = charIdentity;
        _charIdentity.Background = selected.name;
        setCharIdentity(loadDataIntoIdentity(_charIdentity));
        setCharChoices(loadDataIntoChoices(_charIdentity));
        setInventory(loadDataIntoInventory(_charIdentity));
    }

    const addSpell = (spell, type) => {
        if (charChoices.cantripChoice > 0 && type === "cantrip") {
            setCharChoices(prevChoices => ({
                ...prevChoices,
                cantripChoice: prevChoices.cantripChoice - 1
            }));
            setCharIdentity(prevIdentity => ({
                ...prevIdentity,
                spells: [...prevIdentity.spells, spell]
            }));
        }
        if (charChoices.spell1Choice > 0 && type === "lvl1") {
            setCharChoices(prevChoices => ({
                ...prevChoices,
                spell1Choice: prevChoices.spell1Choice - 1
            }));
            setCharIdentity(prevIdentity => ({
                ...prevIdentity,
                spells: [...prevIdentity.spells, spell]
            }));
        }
        if (charChoices.skillChoice > 0 && type === "skill") {
            setCharChoices(prevChoices => ({
                ...prevChoices,
                skillChoice: prevChoices.skillChoice - 1
            }));
            setCharIdentity(prevIdentity => ({
                ...prevIdentity,
                skills: [...prevIdentity.skills, spell]
            }));
        }
    }    

    const calcStat = (stat) => {return charAbilityScores.stats[stat]+charAbilityScores.extraStats[stat]}
    const getProffBonus = () => {
        let lvl = charIdentity.Level
        return lvl < 5 ? 2 : lvl < 9 ? 3 : lvl < 13 ? 4 : lvl < 17 ? 5 : 6
    }
    return (
        <StatsContext.Provider value={{
                charIdentity,
                charAbilityScores, 
                charEquipment,
                charResources,
                charChoices,
                inventory,
                equipment,
                setEquipment,
                setCharIdentity,
                setRaceSubrace,
                calcStat,
                addAbility,
                subtractAbility,
                setClass,
                setBackground,
                setCharResources,
                setInventory,
                setCharChoices,
                addSpell,
                setCharAbilityScores,
                setCharEquipment,
                getProffBonus,
                addItem,
                removeItem,}}>
            {children}
        </StatsContext.Provider>
    );
}