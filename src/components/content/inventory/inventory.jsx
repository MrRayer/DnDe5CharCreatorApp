import { useContext } from "react"
import "./inventory.css"
import { StatsContext } from "../../../context/statsContext"
import { GlobalsContext } from "../../../context/globalsContext"
import InventoryItem from "./components/inventoryItem"
import AddInventoryItem from "../../popups/addInventoryItem/addInventoryItem"

export default function Inventory(){
    const { inventory,setInventory } = useContext(StatsContext)
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext)
    const addItem = () => {
        setPopupName(<AddInventoryItem/>);
        setShaderFlag(true);
    }
    return(
        <>
            <h1 className="inventory-title">Inventario</h1>
            <div className="inventory-container">
                <button className="inventory-add-button"
                        onClick={addItem}>Agregar Item</button>
                {inventory.length > 0 ? (inventory.map(item => <InventoryItem key={item.name} item={item}/>)) : null}
            </div>
        </>
    )
}