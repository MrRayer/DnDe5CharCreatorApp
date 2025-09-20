import "./equipmentPopup.css"
import { useContext } from "react"
import { StatsContext } from "../../../../context/statsContext"
import { GlobalsContext } from "../../../../context/globalsContext"
import ChangeGear from "./changeGear"

export default function EquipmentPopup ({selected, type}) {
    const { setPopupName } = useContext(GlobalsContext);
    const { equipment, setEquipment, addItem } = useContext(StatsContext);
    const handleChangeGear = () => {
        setPopupName(<ChangeGear selected={selected} type={type}/>);
    };
    const handleUnequip = () => {
        const otherHand = {"hand1":"hand2","hand2":"hand1"}
        addItem(equipment[selected]);
        if (equipment[selected]?.tags?.some(tag => tag === "twoHanded") && equipment[otherHand[selected]] === "twoHanding"){
            setEquipment(prevEquipment => ({...prevEquipment, [otherHand[selected]]: "none", [selected]: "none"}));
        }
        else{
            setEquipment(prevEquipment => ({...prevEquipment, [selected]: "none"}));
        }
        
    }
    const titleInSpanish = {
        ring1: "Anillo Equipado",
        ring2: "Anillo Equipado",
        head: "Casco Equipado",
        amulet: "Amuleto Equipado",
        armor: "Armadura Equipada",
        gloves: "Guantes Equipados",
        boots: "Botas Equipadas",
        hand1: "Arma derecha Equipada",
        hand2: "Arma Izquierda Equipada"
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

        {equipment[selected] !== "none" ? (<button className="equipment-popup-change" onClick={() => handleUnequip()}>Desequipar</button>):
        <button className="equipment-popup-change" onClick={() => handleChangeGear()}>Cambiar equipo</button>}
    </div>
}