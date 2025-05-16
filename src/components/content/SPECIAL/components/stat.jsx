import { useContext, useState } from "react";
import "./stat.css"
import { StatsContext } from "../../../../context/statsContext";

export default function Stat({statName, statIndex, statAmmount}){
    const { addAbility,subtractAbility } = useContext(StatsContext)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const calculateModifier = () => {
        const mod = Math.floor((statAmmount-10)/2)
        if (mod > 0) return `+${mod}`;
        else return mod;
    }
    const handleAbilityChange = (actionType) => {
        if (isButtonDisabled) return;
        setIsButtonDisabled(true);
        setTimeout(() => {
            if (actionType === 'add') {
                addAbility(statIndex);
            } else if (actionType === 'subtract') {
                subtractAbility(statIndex);
            }
            setIsButtonDisabled(false);
        }, 100);
    };
    return(
        <div className="stat-container">
            <h1 className="stat-name">{statName}</h1>
            <h1 className="stat-modifier">{calculateModifier()}</h1>
            <div className="stat-number-container">
                <h2 className="stat-button" onClick={() => handleAbilityChange('subtract')}>-</h2>
                <h2 className="stat-number">{statAmmount}</h2>
                <h2 className="stat-button" onClick={() => handleAbilityChange('add')}>+</h2>
            </div>
        </div>
    )
}