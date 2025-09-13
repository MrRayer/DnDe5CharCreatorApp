import "./changeGear.css"
import { useContext } from "react"
import { StatsContext } from "../../../../context/statsContext"
import { GlobalsContext } from "../../../../context/globalsContext"
import EquipmentPopup from "./equipmentPopup"

export default function ChangeGear({selected}) {
    const { setPopupName } = useContext(GlobalsContext)
    const { inventory, setEquipment, removeItem } = useContext(StatsContext)
    const handleItemEquipping = (item) => {
        setEquipment(prevEquipment => ({...prevEquipment, [selected]: item}));
        removeItem(item);
        setPopupName(<EquipmentPopup selected={selected}/>)
    }
    return (
        <div className="change-gear-main-container">
            <h1 className="change-gear-title change-gear-top-separator">change gear {selected}</h1>
            {inventory.map(item => selected === item.slot &&
                <div className="change-gear-item" onClick={()=>handleItemEquipping(item)} key={item.name}>
                    <h1 className="change-gear-title change-gear-top-separator">{item.name}</h1>
                    {item?.ac ?
                        <div className="change-gear-subcontainer">
                            <h1 className="change-gear-subtitle">AC:</h1>
                            <h1 className="change-gear-subtitle">{item.ac}</h1>
                        </div>
                    : null}
                    {item?.damage ?
                        <div className="change-gear-subcontainer">
                            <h1 className="change-gear-subtitle">Daño:</h1>
                            <h1 className="change-gear-subtitle">{item.damage}</h1>
                        </div>
                    : null}
                </div>
            )}
        </div>
    )
}