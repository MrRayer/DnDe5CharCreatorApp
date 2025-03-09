import "./mainStats.css"
import Stat from "./components/stat"
import { StatsContext } from "../../../context/statsContext"
import { useContext,useRef,useEffect } from "react"

export default function MainStats() {
    const { calcStat, charAbilityScores } = useContext(StatsContext);
    return(
        <div className="main-stats-container-container">
            <h2 className="remaining-points">Puntos extra: {charAbilityScores["Remaining"]}</h2>
            <div className="main-stats-container">
                <Stat statName="Fue" statIndex={0} statAmmount={calcStat(0)}/>
                <Stat statName="Agi" statIndex={1} statAmmount={calcStat(1)}/>
                <Stat statName="Con" statIndex={2} statAmmount={calcStat(2)}/>
                <Stat statName="Int" statIndex={3} statAmmount={calcStat(3)}/>
                <Stat statName="Sab" statIndex={4} statAmmount={calcStat(4)}/>
                <Stat statName="Car" statIndex={5} statAmmount={calcStat(5)}/>
            </div>
        </div>
    )
}