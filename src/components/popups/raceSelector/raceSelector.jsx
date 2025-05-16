import { useContext } from "react"
import "./raceSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Races from "../../../data/races";
import { GlobalsContext } from "../../../context/globalsContext";
import GetStatName from "../../../logic/getStatName";

export default function RaceSelector() {
    const { setRaceSubrace } = useContext(StatsContext);
    const { setPopupName } = useContext(GlobalsContext);

    return (
        <div className="race-selector-container">
            {Races.map((race) => (
                <div 
                    key={race.Race} 
                    className="race-item-container" 
                    onClick={() => {
                        setRaceSubrace("Race", race);
                        setPopupName("SubRace");
                    }}
                >
                    <h1 className="race-title">{race.Race}</h1>
                    {race.extraStats.map((value, index) =>
                        value > 0 ? <p key={index}>{GetStatName(index)}: +{value}</p> : null
                    )}
                </div>
            ))}
        </div>
    );
}