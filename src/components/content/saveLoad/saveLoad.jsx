import "./saveLoad.css"
import { useContext } from "react";
import { StatsContext } from "../../../context/statsContext";
export default function SaveLoad(){
    const { charIdentity, charResources, charAbilityScores,
            charEquipment, charChoices, inventory,
            setCharIdentity, setCharResources,
            setCharAbilityScores, setCharEquipment,
            setCharChoices, setInventory } = useContext(StatsContext);
    const handleSave = () => {
        const savedStats = [
            charIdentity,
            charResources,
            charAbilityScores,
            charEquipment,
            charChoices,
            inventory
        ]
        localStorage.setItem("savedStats",JSON.stringify(savedStats))
        console.log("data stored")
    }
    const handleLoad = () => {
        const rawSavedStats = localStorage.getItem("savedStats")
        const savedStats = JSON.parse(rawSavedStats);
        loadData(savedStats);
        console.log("data loaded")
    }
    const loadData = (savedStats) => {
        setCharIdentity(savedStats[0]);
        setCharResources(savedStats[1]);
        setCharAbilityScores(savedStats[2]);
        setCharEquipment(savedStats[3]);
        setCharChoices(savedStats[4]);
        setInventory(savedStats[5]);
    }
    return(
        <div className="saveload-main-container">
            <button className="saveload-button" onClick={handleSave}>Save</button>
            <button className="saveload-button" onClick={handleLoad}>Load</button>
        </div>
    );
}