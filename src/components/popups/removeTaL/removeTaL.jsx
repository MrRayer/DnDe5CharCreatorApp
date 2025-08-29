import "./removeTaL.css"
import { useContext } from "react"
import { GlobalsContext } from "../../../context/globalsContext"
import { StatsContext } from "../../../context/statsContext"
import RemoveTaLItem from "./components/removeTaLItem"

export default function RemoveTaL() {
    const { setShaderFlag, choosingType } = useContext(GlobalsContext)
    const { charIdentity, setCharIdentity } = useContext(StatsContext)
    const selectionInLang = {"tools":"Herramienta","lang":"Lenguaje","armor":"Armadura","weapons":"Arma"}
    const selectedList = choosingType === "tools" ? (charIdentity.toolProf) :
                        choosingType === "lang" ? (charIdentity.languages) :
                        choosingType === "armor" ? (charIdentity.armorProf) :
                        choosingType === "weapons" ? (charIdentity.weaponProf) : null;
    const handleRemove = (item) => {
        choosingType === "tools" ? (removeToolFromList(item)) :
        choosingType === "lang" ? (removeLangFromList(item)) :
        choosingType === "armor" ? (removeArmorFromList(item)) :
        choosingType === "weapons" ? (removeWeaponFromList(item)) : null;        
        setShaderFlag(false);
    }
    const removeToolFromList = (_tool) => {
        setCharIdentity(prev => ({
            ...prev,
            toolProf: prev.toolProf.filter(tool => tool !== _tool)
        }));
    }
    const removeLangFromList = (_lang) => {
        console.log("removing lang from list:")
        console.log(_lang)
        console.log(charIdentity.languages)
        setCharIdentity(prev => ({
            ...prev,
            languages: prev.languages.filter(lang => lang !== _lang)
        }));
    }
    const removeArmorFromList = (_armor) => {
        setCharIdentity(prev => ({
            ...prev,
            armorProf: prev.armorProf.filter(armor => armor !== _armor)
        }));
    }
    const removeWeaponFromList = (_weapon) => {
        setCharIdentity(prev => ({
            ...prev,
            weaponProf: prev.weaponProf.filter(weapon => weapon !== _weapon)
        }));
    }
    return (
        <>
            <h1 className="add-tal-title">Quitar {selectionInLang[choosingType]}</h1>
            <div className="add-tal-container">
                {selectedList.map((item, key) => <RemoveTaLItem item={item} key={key} callback={handleRemove}/>)}
            </div>
        </>
    )
}