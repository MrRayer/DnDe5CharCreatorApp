import "./mainStats.css"
import Stat from "./components/stat"
import { StatsContext } from "../../../context/statsContext"
import { useContext } from "react"
export default function MainStats() {
    const { charStats, addAbility, subtractAbility } = useContext(StatsContext);
    return(
        <div className="main-stats-container-container">
            <h2 className="remaining-points">Remaining: {charStats["Remaining"]}</h2>
            <div className="main-stats-container">
                <Stat statName="Fue" statAmmount={charStats["Strength"]} plus={() => addAbility("Strength")} minus={() => subtractAbility("Strength")}/>
                <Stat statName="Agi" statAmmount={charStats["Dexterity"]} plus={() => addAbility("Dexterity")} minus={() => subtractAbility("Dexterity")}/>
                <Stat statName="Con" statAmmount={charStats["Constitution"]} plus={() => addAbility("Constitution")} minus={() => subtractAbility("Constitution")}/>
                <Stat statName="Int" statAmmount={charStats["Intelligence"]} plus={() => addAbility("Intelligence")} minus={() => subtractAbility("Intelligence")}/>
                <Stat statName="Sab" statAmmount={charStats["Wisdom"]} plus={() => addAbility("Wisdom")} minus={() => subtractAbility("Wisdom")}/>
                <Stat statName="Car" statAmmount={charStats["Charisma"]} plus={() => addAbility("Charisma")} minus={() => subtractAbility("Charisma")}/>
            </div>
        </div>
    )
}