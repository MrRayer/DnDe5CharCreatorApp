import { useContext, useState } from "react"
import "./addInventoryItem.css"
import { StatsContext } from "../../../../context/statsContext";
import { GlobalsContext } from "../../../../context/globalsContext";
import ItemForm from "./itemForm";
import InfoPopup from "./infoPopup";

export default function AddInventoryItem(){
    const { inventory, setInventory } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext);
    const [ infoPopupFlag, setInfoPopupFlag ] = useState(false)
    const [ infoPopupContent, setInfoPopupContent ] = useState(false)
    const handleClickAdd = (item) => {
        addItem(item)
    }
    const addItem = (newItem) => {
        if (inventory.some(item => item.name === newItem.name)) {
            setInfoPopupContent("El nombre del item ya esta en uso por otro item en su inventario");
            setInfoPopupFlag(true);
            return;
        }
        setInventory(prevInventory => [...(prevInventory || []), newItem]);
        setShaderFlag(false);
    };

    return(
        <>
            <h1 className="add-item-title add-item-sepatator">Agregar Item</h1>
            <ItemForm handleItem={handleClickAdd}/>
            {infoPopupFlag && <InfoPopup flagSetter={setInfoPopupFlag} content={infoPopupContent}/>}
        </>
    )
}