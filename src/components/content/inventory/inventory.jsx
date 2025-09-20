import { useContext } from "react"
import "./inventory.css"
import { StatsContext } from "../../../context/statsContext"
import { GlobalsContext } from "../../../context/globalsContext"
import InventoryItem from "./components/inventoryItem"
import AddInventoryItem from "./components/addInventoryItem"
import ItemDetails from "./components/itemDetails"

export default function Inventory(){
    const { inventory,setInventory } = useContext(StatsContext)
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext)
    const addItem = () => {
        setPopupName(<AddInventoryItem/>);
        setShaderFlag(true);
    }
    const handleOpenDetails = (item) => {
        setPopupName(<ItemDetails item={item}/>)
        setShaderFlag(true);
    }
    return(
        <>
            <h1 className="inventory-title">Inventario</h1>
            <div className="inventory-container">
                <div className="inventory-add-button"
                        onClick={addItem}>Agregar Item</div>
                {inventory.length > 0 ? (inventory.map(item =>
                    <InventoryItem key={item.name} item={item} onClick={handleOpenDetails}/>
                )) : null}
            </div>
        </>
    )
}