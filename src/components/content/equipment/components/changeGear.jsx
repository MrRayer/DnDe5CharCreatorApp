import "./changeGear.css"
import { useContext } from "react"
import { StatsContext } from "../../../../context/statsContext"
import { GlobalsContext } from "../../../../context/globalsContext"
import EquipmentPopup from "./equipmentPopup"

export default function ChangeGear({selected, type}) {
    const { setPopupName } = useContext(GlobalsContext)
    const { inventory, equipment, setEquipment, removeItem, addItem } = useContext(StatsContext)
    const handleItemEquipping = (item) => {
        setEquipment(prevEquipment => ({...prevEquipment, [selected]: item}));
        if (selected === "hand1" || selected === "hand2")
        {
            if (item?.tags?.some(tag => tag === "twoHanded")){
                const otherHand = {"hand1":"hand2","hand2":"hand1"}
                addItem(equipment[otherHand[selected]])
                setEquipment(prevEquipment => ({...prevEquipment, [otherHand[selected]]: "twoHanding"}));
            }
        }        
        removeItem(item);
        setPopupName(<EquipmentPopup selected={selected}/>)
    }
    return (
        <div className="change-gear-main-container">
            <h1 className="change-gear-title change-gear-top-separator">change gear {selected}</h1>
            {inventory.map(item => type === item.slot &&
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