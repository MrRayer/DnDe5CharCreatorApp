import { useContext } from "react"
import "./raceSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Races from "../../../data/races";
import Subraces from "../../../data/subraces";
import { GlobalsContext } from "../../../context/globalsContext";
import GetStatName from "../../../logic/getStatName";

export default function RaceSelector() {
    const { setRaceSubrace } = useContext(StatsContext);
    const { setPopupName, setShaderFlag } = useContext(GlobalsContext);
    const handleRaceSelect = (race) => {
        setRaceSubrace("Race", race);
        const _subraces = Subraces.filter(subrace => subrace.Parent === race.Race)
        if (_subraces.length > 0) {setPopupName("SubRace");}
        else {setShaderFlag(false)}
    }

    return (
        <div className="race-selector-container">
            {Races.map((race) => (
                <div
                    key={race.Race}
                    className="race-item-container" 
                    onClick={()=>handleRaceSelect(race)}
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