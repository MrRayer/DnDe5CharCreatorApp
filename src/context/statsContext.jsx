import React, { createContext, useState } from "react";
import { loadDataIntoAbilityScores, loadDataIntoChoices, loadDataIntoIdentity, loadDataIntoResources } from "../logic/loadDataIntoContext";

export const StatsContext = createContext();
export function StatsProvider({ children }) {
    const [charIdentity, setCharIdentity] = useState({
        Name: "Nombre del personaje",
        Race: "none",
        Subrace: "none",
        Class: "none",
        Subclass:"none",
        Level: 1,
        languages: ["Common"],
        baseHP : 1,
        hitDie : 1,
        armorProf : [],
        weaponProf : [],
        toolProf : [],
        abilities : [],
        spells : [],
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
            setCharIdentity(loadDataIntoIdentity(_charIdentity));
            setCharAbilityScores(loadDataIntoAbilityScores(_charIdentity));
            setCharChoices(loadDataIntoChoices(_charIdentity));
        }
        else {
            _charIdentity.Subrace = Value.Subrace;
            setCharIdentity(loadDataIntoIdentity(_charIdentity));
            setCharAbilityScores(loadDataIntoAbilityScores(_charIdentity));
            setCharChoices(loadDataIntoChoices(_charIdentity));
        }
    };

    const setClass = (selected) => {
        let _charIdentity = charIdentity;
        _charIdentity.Class = selected.name;
        setCharIdentity(loadDataIntoIdentity(_charIdentity));
        setCharResources(loadDataIntoResources(_charIdentity));
        setCharChoices(loadDataIntoChoices(_charIdentity));
    }

    const resetResources = () =>{
        setCharResources(prevResources => ({
            ...prevResources,
            current: [...prevResources.max]
        }));
    }

    const addSpell = (spell, type) => {
        if (charChoices.cantripChoice > 0) {
            setCharChoices(prevChoices => ({
                ...prevChoices,
                cantripChoice: prevChoices.cantripChoice - 1
            }));
            setCharIdentity(prevIdentity => ({
                ...prevIdentity,
                spells: [...prevIdentity.spells, spell]
            }));
        }
    }

    const calcStat = (stat) => {return charAbilityScores.stats[stat]+charAbilityScores.extraStats[stat]}
    return (
        <StatsContext.Provider value={{
                charIdentity,
                charAbilityScores, 
                charEquipment,
                charResources,
                charChoices,
                setRaceSubrace,
                calcStat,
                addAbility,
                subtractAbility,
                setClass,
                setCharResources,
                resetResources,
                addSpell}}>
            {children}
        </StatsContext.Provider>
    );
}