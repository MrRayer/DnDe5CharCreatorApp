import React, { createContext, useState } from "react";

export const StatsContext = createContext();
export function StatsProvider({ children }) {
    const [charIdentity, setCharIdentity] = useState({
        Name: "Nombre del personaje",
        Race: "none",
        Subrace: "none",
        Class: "none",
        Subclass:"none",
        Level: 1,
        Experience: 0,
        Background: "",
        Alignment: "Neutral",
        Languages: ["Common"]
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

    const setRaceSubrace = (Stat, Value, _extraStats) => {
        setCharIdentity(prevIdentity => ({
            ...prevIdentity,
            [Stat]: Value
        }));
        if (Stat === "Race") {
            setCharAbilityScores({
                stats: [8,8,8,8,8,8],
                Remaining: 27,
                extraStats:_extraStats
            });
        }
        else setCharAbilityScores(prevStats => {
            return {
                ...prevStats,
                extraStats: prevStats.extraStats.map((val, index) => val + _extraStats[index])
            };
        });
    };

    const setClass = (selected) => {
        setCharIdentity(prevId => ({...prevId, Class: selected}))
    }

    const resetResources = () =>{
        setCharResources(prevResources => ({
            ...prevResources,
            current: [...prevResources.max]
        }));
    }

    const calcStat = (stat) => {return charAbilityScores["stats"][stat]+charAbilityScores["extraStats"][stat]}
    return (
        <StatsContext.Provider value={{
                charIdentity,
                charAbilityScores, 
                charEquipment,
                charResources,
                setRaceSubrace,
                calcStat,
                addAbility,
                subtractAbility,
                setClass,
                setCharResources,
                resetResources}}>
            {children}
        </StatsContext.Provider>
    );
}