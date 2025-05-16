import { useContext } from "react"
import "./inventory.css"
import { InventoryContext } from "../../../context/inventoryContext"
import { GlobalsContext } from "../../../context/globalsContext"
import InventoryItem from "./components/inventoryItem"

export default function Inventory(){
    const { inventory,setInventory } = useContext(InventoryContext)
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext)
    const addItem = () => {
        setPopupName("addInventoryItem");
        setShaderFlag(true);
    }
    return(
        <>
            <h1 className="inventory-title">Inventario</h1>
            <div className="inventory-container">
                <button className="inventory-add-button"
                        onClick={addItem}>Agregar Item</button>
                {inventory.map(item => <InventoryItem item={item}/>)}
            </div>
        </>
    )
}