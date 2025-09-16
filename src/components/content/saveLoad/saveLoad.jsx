import "./saveLoad.css"
import { useContext, useRef, useState } from "react";
import { StatsContext } from "../../../context/statsContext";
import InfoPopup from "../inventory/components/infoPopup";

export default function SaveLoad(){
    const [ infoPopupFlag, setInfoPopupFlag ] = useState(false);
    const [ infoPopupContent, setInfoPopupContent ] = useState("");
    const fileInputRef = useRef();
    const { charIdentity, charResources, charAbilityScores,
            charEquipment, charChoices, inventory, equipment,
            setCharIdentity, setCharResources,
            setCharAbilityScores, setCharEquipment,
            setCharChoices, setInventory, setEquipment } = useContext(StatsContext);
    const handleSave = () => {
        const savedStats = [
            charIdentity,
            charResources,
            charAbilityScores,
            charEquipment,
            charChoices,
            inventory,
            equipment
        ]
        localStorage.setItem("savedStats",JSON.stringify(savedStats))
        setInfoPopupContent("Guardado rapido exitoso");
        setInfoPopupFlag(true);
    }
    const handleLoad = () => {
        const rawSavedStats = localStorage.getItem("savedStats")
        const savedStats = JSON.parse(rawSavedStats);
        loadData(savedStats);
        setInfoPopupContent("Personaje cargado");
        setInfoPopupFlag(true);
    }
    const loadData = (savedStats) => {
        setCharIdentity(savedStats[0]);
        setCharResources(savedStats[1]);
        setCharAbilityScores(savedStats[2]);
        setCharEquipment(savedStats[3]);
        setCharChoices(savedStats[4]);
        setInventory(savedStats[5]);
        setEquipment(savedStats[6]);
    }
    const importChar = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                loadData(data);
                setInfoPopupContent("Personaje cargado");
                setInfoPopupFlag(true);
            } catch (err) { console.log("invalid JSON", err);}
        }
        reader.readAsText(file);

    }
    const exportChar = () => {
        const savedStats = [
            charIdentity,
            charResources,
            charAbilityScores,
            charEquipment,
            charChoices,
            inventory,
            equipment
        ]
        const savedStatsJson = JSON.stringify(savedStats,null,2);
        const blob = new Blob([savedStatsJson],{ type:"application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = charIdentity.Name + ".json"
        link.click();
        URL.revokeObjectURL(url);
    }
    return(
        <div className="saveload-main-container">
            <button className="saveload-button" onClick={handleSave}>Guardado rapido</button>
            <button className="saveload-button" onClick={handleLoad}>Cargado rapido</button>
            <input type="file" accept="application/json" ref={fileInputRef}
                onChange={importChar} style={{display:"none"}}/>
            <button className="saveload-button" onClick={()=>fileInputRef.current.click()}>Cargar desde archivo</button>
            <button className="saveload-button" onClick={exportChar}>Descargar</button>
            {infoPopupFlag && <InfoPopup flagSetter={setInfoPopupFlag} content={infoPopupContent}/>}
        </div>
    );
}