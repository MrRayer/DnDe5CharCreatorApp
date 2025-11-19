import "./saveLoad.css"
import { useContext, useRef, useState, useEffect, useCallback } from "react";
import { StatsContext } from "../../../context/statsContext";
import InfoPopup from "../inventory/components/infoPopup";

export function SaveLoad(){
    const [ infoPopupFlag, setInfoPopupFlag ] = useState(false);
    const [ infoPopupContent, setInfoPopupContent ] = useState("");
    const fileInputRef = useRef();
    const { charIdentity, charResources, charAbilityScores,
            charChoices, inventory, equipment, notes,
            setCharIdentity, setCharResources,
            setCharAbilityScores, setCharChoices, setInventory, setEquipment,
            setNotes } = useContext(StatsContext);
    const [ savedSlots, setSavedSlots ] = useState({
        slot1: null,
        slot2: null,
        slot3: null,
        slot4: null,
        slot5: null,
        autoSave: null
    });

    const handleSave = (slot) => {
        const savedStats = {
            identity:charIdentity,
            resources:charResources,
            abilityScores:charAbilityScores,
            choices:charChoices,
            inventory:inventory,
            equipment:equipment,
            notes:notes,
            timeStamp: Date.now(),
            title: charIdentity.Name
        }
        localStorage.setItem(`savedStats_slot_${slot}`,JSON.stringify(savedStats))
    }
    const handleLoad = (slot) => {
        const rawSavedStats = localStorage.getItem(`savedStats_slot_${slot}`)
        const savedStats = JSON.parse(rawSavedStats);
        loadData(savedStats);
        setInfoPopupContent("Personaje cargado");
        setInfoPopupFlag(true);
    }
    const loadData = (savedStats) => {
        setCharIdentity(savedStats.identity);
        setCharResources(savedStats.resources);
        setCharAbilityScores(savedStats.abilityScores);
        setCharChoices(savedStats.choices);
        setInventory(savedStats.inventory);
        setEquipment(savedStats.equipment);
        setNotes(savedStats.notes);
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
    const legacyHandleLoad = () => {
        const rawSavedStats = localStorage.getItem("savedStats")
        const savedStats = JSON.parse(rawSavedStats);
        legacyLoadData(savedStats);
        setInfoPopupContent("Personaje cargado");
        setInfoPopupFlag(true);
    }
    const legacyLoadData = (savedStats) => {
        setCharIdentity(savedStats[0]);
        setCharResources(savedStats[1]);
        setCharAbilityScores(savedStats[2]);
        setCharChoices(savedStats[4]);
        setInventory(savedStats[5]);
        setEquipment(savedStats[6]);
    }
    const legacyImportChar = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                legacyLoadData(data);
                setInfoPopupContent("Personaje cargado");
                setInfoPopupFlag(true);
            } catch (err) { console.log("invalid JSON", err);}
        }
        reader.readAsText(file);
    }
    const exportChar = () => {
        const savedStats = {
            identity:charIdentity,
            resources:charResources,
            abilityScores:charAbilityScores,
            choices:charChoices,
            inventory:inventory,
            equipment:equipment,
            notes:notes,
            timeStamp: Date.now(),
            title: charIdentity.Name
        }
        const savedStatsJson = JSON.stringify(savedStats,null,2);
        const blob = new Blob([savedStatsJson],{ type:"application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = charIdentity.Name + ".json"
        link.click();
        URL.revokeObjectURL(url);
    }
    useEffect(() => {
        setSavedSlots({
            autoSave: JSON.parse(localStorage.getItem("savedStats_slot_0")),
            slot1: JSON.parse(localStorage.getItem("savedStats_slot_1")),
            slot2: JSON.parse(localStorage.getItem("savedStats_slot_2")),
            slot3: JSON.parse(localStorage.getItem("savedStats_slot_3")),
            slot4: JSON.parse(localStorage.getItem("savedStats_slot_4")),
            slot5: JSON.parse(localStorage.getItem("savedStats_slot_5"))
        });
    }, [handleLoad, handleSave]);
    console.log
    return(
        <div className="saveload-main-container">
            <div className="saveload-button-row">
                <input type="file" accept="application/json" ref={fileInputRef}
                    onChange={importChar} style={{display:"none"}}/>
                <button className="saveload-button" onClick={()=>fileInputRef.current.click()}>Cargar desde archivo</button>
                <button className="saveload-button" onClick={exportChar}>Descargar</button>
            </div>
            {Object.values(savedSlots).map((slot, index)=>
                <div className="saveload-slot-container" key={index}>
                    <h1 className="saveload-slot-title">{index === 0 ? "autosave":`Slot ${index}`}</h1>
                    <h2 className="saveload-slot-name">{slot ? slot.title : "Empty"}</h2>
                    <h2 className="saveload-slot-timestamp">{slot ? new Date(slot.timeStamp).toLocaleString() : ""}</h2>
                    <div className="saveload-slot-button-container">
                        <button className="saveload-slot-button" onClick={()=>handleSave(index)}>Guardar</button>
                        <button className="saveload-slot-button" onClick={()=>handleLoad(index)}>Cargar</button>
                    </div>
                </div>
            )}
            {infoPopupFlag && <InfoPopup flagSetter={setInfoPopupFlag} content={infoPopupContent}/>}
        </div>
    );
}
export function useAutosave() {
    const ctx = useContext(StatsContext);

    return useCallback(() => {
        if (!ctx.charIdentity.Name || ctx.charIdentity.Name === "Nombre del personaje") {
            return;
        }
        const savedStats = {
            identity: ctx.charIdentity,
            resources: ctx.charResources,
            abilityScores: ctx.charAbilityScores,
            choices: ctx.charChoices,
            inventory: ctx.inventory,
            equipment: ctx.equipment,
            notes: ctx.notes,
            timeStamp: Date.now(),
            title: ctx.charIdentity.Name,
        };

        localStorage.setItem("savedStats_slot_0", JSON.stringify(savedStats));
    }, [
        ctx.charIdentity, 
        ctx.charResources,
        ctx.charAbilityScores,
        ctx.charChoices,
        ctx.inventory,
        ctx.equipment,
        ctx.notes
    ]);
}