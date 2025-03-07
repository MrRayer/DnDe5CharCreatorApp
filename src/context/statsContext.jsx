import React, { createContext, useState } from "react";

export const StatsContext = createContext();
export function StatsProvider({ children }) {
    const [charStats, setCharStats] = useState({
            // Basic Identity
            "Name": "Nombre del personaje",
            "Race": "Human",
            "Class": "Warrior",
            "Level": 1,
            "Experience": 0,
            "Background": "",
            "Alignment": "Neutral",
            // Race/Class Details
            "Languages": ["Common"],
            // Ability Scores
            "Strength": 8,
            "Dexterity": 8,
            "Constitution": 8,
            "Intelligence": 8,
            "Wisdom": 8,
            "Charisma": 8,
            "Remaining": 27,
            // Equipment Bonuses
            "ACA": 0,
            "ACS": 0
    });
    const addAbility = (ability) => {
        setCharStats(prevStats => {
            const newStats = { ...prevStats };
            let cost = 1;
            const currentValue = newStats[ability];    
            if (currentValue < 13) cost = 1;
            else if (currentValue < 15) cost = 2;
            else if (currentValue < 16) cost = 3;
            else return prevStats;
            if (newStats.Remaining < cost) return prevStats;
            newStats[ability] += 1;
            newStats.Remaining -= cost;    
            return newStats;
        });
    }
    const subtractAbility = (ability) => {
        setCharStats(prevStats => {
            const newStats = { ...prevStats };
            const currentValue = newStats[ability];    
            if (currentValue <= 8) return prevStats;    
            let refund = 1;
            if (currentValue > 15) refund = 3;
            else if (currentValue > 13) refund = 2;    
            newStats[ability] -= 1;
            newStats.Remaining += refund;    
            return newStats;
        });
    };
    return (
        <StatsContext.Provider value={{ charStats, addAbility, subtractAbility }}>
            {children}
        </StatsContext.Provider>
    );
}