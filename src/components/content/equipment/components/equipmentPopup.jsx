import "./equipmentPopup.css"
import { useContext } from "react"
import { StatsContext } from "../../../../context/statsContext"
import { GlobalsContext } from "../../../../context/globalsContext"
import ChangeGear from "./changeGear"

export default function EquipmentPopup ({selected}) {
    const { setPopupName } = useContext(GlobalsContext);
    const { equipment, setEquipment, addItem } = useContext(StatsContext);
    const handleChangeGear = () => {
        setPopupName(<ChangeGear selected={selected}/>);
    };
    const handleUnequip = () => {
        addItem(equipment[selected]);
        setEquipment(prevEquipment => ({...prevEquipment, [selected]: "none"}));
    }
    const titleInSpanish = {
        ring1: "Anillo Equipado",
        ring2: "Anillo Equipado",
        head: "Casco Equipado",
        amulet: "Amuleto Equipado",
        armor: "Armadura Equipada",
        gloves: "Guantes Equipados",
        boots: "Botas Equipadas",
        mWeapon: "Arma cuerpo a cuerpo Equipada",
        rWeapon: "Arma a distancia Equipada",
        shield: "Escudo Equipado"
    }
    return <div className="equipment-popup-main-container">
        <h1 className="equipment-popup-title-top">{titleInSpanish[selected]}</h1>
        <h2 className="equipment-popup-current">{equipment[selected]?.name || "Sin equipo"}</h2>
        {equipment[selected]?.ac ?
            <>
                <h1 className="equipment-popup-title">AC</h1>
                <h2 className="equipment-popup-current">{equipment[selected]?.ac || "sin AC"}</h2>
            </>
        : null}
        {equipment[selected]?.damage ?
            <>
                <h1 className="equipment-popup-title">Daño</h1>
                <h2 className="equipment-popup-current">{equipment[selected]?.damage || "sin daño"}</h2>
            </>
        : null}
        {equipment[selected]?.description ?
            <>
                <h1 className="equipment-popup-title">Descripcion</h1>
                <h2 className="equipment-popup-current">{equipment[selected]?.description || "sin descripcion"}</h2>
            </>
        : null}
        {equipment[selected] !== "none" ? (<button className="equipment-popup-change" onClick={() => handleUnequip()}>Desequipar</button>): null}
        <button className="equipment-popup-change" onClick={() => handleChangeGear()}>Cambiar equipo</button>
    </div>
}