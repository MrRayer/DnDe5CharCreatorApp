import { useContext, useState } from "react"
import "./calculatedStats.css"
import { StatsContext } from "../../../context/statsContext"

export default function CalculatedStats(){
    const { charIdentity, equipment, calcStat } = useContext(StatsContext);
    const HP = charIdentity.baseHP + (Math.floor((calcStat(2) - 10) / 2)) + ((charIdentity.Level - 1) * charIdentity.hitDie);
    const [currentHP,setCurrentHP] = useState(HP);
    let timer;
    const addCurrentHP = () => {
        if (currentHP < HP){
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCurrentHP(currentHP + 1);
            }, 100);
        }
    };
    const minusCurrentHP = () => {
        if (currentHP > 0){
            clearTimeout(timer);
            timer = setTimeout(() => {
                setCurrentHP(currentHP - 1);
            }, 100);
        }
    };
    const agilityMod = Math.floor((calcStat(1) - 10) / 2);
    const constMod = Math.floor((calcStat(2) - 10) / 2);
    const ACN = 10 +
                agilityMod +
                ((charIdentity.abilities.some(item => item === "unarmoredDefense"))&&
                (!equipment.armor.ac || equipment.armor.ac === 0) &&
                constMod);
    const armorAC = equipment?.armor?.ac ? (
        equipment.armor.ac +
        (equipment.armor.armorType === "light" ? (agilityMod) :
        equipment.armor.armorType === "medium" ? (Math.min(agilityMod, 2)) :
        0)
    ) : 0;
    const shieldAC = equipment.shield.ac ?? 0
    const AC = Math.max(armorAC, ACN) + shieldAC;

    const Initiative = () => {
        const Ini = Math.floor((calcStat(1) - 10) / 2);
        if (Ini > 0) return `+${Ini}`;
        else return Ini;
    }
    const NatP = 12 + Math.floor((calcStat(4) - 10) / 2) + Math.floor(charIdentity["Level"] / 4);
    return(
        <div className="calculated-stats-main-container">
            <div className="HP-container">
                <h1 className="HP-title">HP</h1>
                <div className="current-HP-container">
                    <h1 className="max-HP">{HP}</h1>
                    <div className="curernt-HP">{currentHP}</div>
                </div>
                <div className="HP-buttons-container">
                    <div className="HP-button HP-button-minus" onClick={()=>{minusCurrentHP()}}>-</div>
                    <div className="HP-button" onClick={()=>{addCurrentHP()}}>+</div>
                </div>
            </div>
            <div className="AC-container">
                <div className="current-AC-container">
                    <h1 className="AC-title">AC</h1>
                    <h1 className="current-AC">{AC}</h1>
                </div>
                <div className="AC-details-container">
                    <div className="AC-nat-container">
                        <h1>Natural</h1>
                        <div className="AC">
                            {ACN}
                        </div>
                    </div>
                    <div className="AC-arm-container">
                        <h1>Armadura</h1>
                        <div className="AC">{armorAC}</div>
                    </div>
                    <div className="AC-shield-container">
                        <h1>Escudo</h1>
                        <div className="AC">{shieldAC}</div>
                    </div>
                </div>
            </div> 
            <div className="ini-per-container">
                <div className="ini-container">
                    <h1>Iniciativa</h1>
                    <div className="AC">{Initiative()}</div>
                </div>
                <div className="per-container">
                    <h1>Percepcion</h1>
                    <h1>Pasiva</h1>
                    <div className="AC">{NatP}</div>
                </div>
            </div>
        </div>
    )
}