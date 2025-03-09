import { useContext } from "react"
import "./raceSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Races from "../../../data/races";
import { GlobalsContext } from "../../../context/globalsContext";
import GetStatName from "../../../logic/getStatName";

export default function RaceSelector(){
    const { setRaceSubrace } = useContext(StatsContext);
    const { setPopupName } = useContext(GlobalsContext);
    return (
        <div className="race-selector-container">
            {Races.map(race => (
                <div key={race.Race} className="race-conainer" onClick={() => {setRaceSubrace("Race", race.Race, race.extraStats); setPopupName("SubRace");}}>
                    <h1 className="race-title">{race.Race}</h1>
                    {Object.entries(race.extraStats).map(([stat, value]) =>
                        value > 0 ? (<p key={GetStatName(stat)}>{GetStatName(stat)}: +{value}</p>) : null
                    )}
                </div>
            ))}
        </div>
    );
}