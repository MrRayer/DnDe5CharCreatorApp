import "./addTaL.css"
import { useRef, useContext } from "react"
import { GlobalsContext } from "../../../context/globalsContext"
import { StatsContext } from "../../../context/statsContext"

export default function AddTaL(){
    const { setShaderFlag, choosingType } = useContext(GlobalsContext)
    const { charIdentity, setCharIdentity } = useContext(StatsContext)
    const addtalNameRef = useRef('')
    const selectionInLang = {"tools":"Herramientas","lang":"Lenguajes","armor":"Armaduras","weapons":"Armas"}
    const handleAddTaL = () => {
        choosingType === "tools" ? (addTools()) :
        choosingType === "armor" ? (addArmor()) :
        choosingType === "weapons" ? (addWeapon()) :
        choosingType === "lang" ? (addLang()) : null;
        setShaderFlag(false);
    }
    const addTools = () => {
        if (addtalNameRef.current.value === "") return;
        if (charIdentity.toolProf.includes(addtalNameRef.current.value)) return
        setCharIdentity(prev => ({
            ...prev,
            toolProf: [...prev.toolProf, addtalNameRef.current.value]
        }));
    }
    const addLang = () => {
        if (addtalNameRef.current.value === "") return;
        if (charIdentity.languages.includes(addtalNameRef.current.value)) return
        setCharIdentity(prev => ({
            ...prev,
            languages: [...prev.languages, addtalNameRef.current.value]
        }));
    }
    const addWeapon = () => {
        if (addtalNameRef.current.value === "") return;
        if (charIdentity.weaponProf.includes(addtalNameRef.current.value)) return
        setCharIdentity(prev => ({
            ...prev,
            weaponProf: [...prev.weaponProf, addtalNameRef.current.value]
        }));
    }
    const addArmor = () => {
        if (addtalNameRef.current.value === "") return;
        if (charIdentity.armorProf.includes(addtalNameRef.current.value)) return
        setCharIdentity(prev => ({
            ...prev,
            armorProf: [...prev.armorProf, addtalNameRef.current.value]
        }));
    }
    return(
        <>
            <h1 className="add-tal-title">Agregar {selectionInLang[choosingType]}</h1>
            <div className="add-tal-container">
                <h1 className="add-tal-label">Nombre</h1>
                <input ref={addtalNameRef} className="add-tal-input"/>
            </div>
            <button className="add-tal-button" onClick={handleAddTaL}>Agregar</button>
        </>
    )
}