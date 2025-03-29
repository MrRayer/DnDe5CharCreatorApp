import { useContext, useRef } from "react"
import "./addInventoryItem.css"
import { InventoryContext } from "../../../context/inventoryContext"
import { GlobalsContext } from "../../../context/globalsContext";

export default function AddInventoryItem(){
    const { inventory,setInventory } = useContext(InventoryContext);
    const { setShaderFlag } = useContext(GlobalsContext)
    const addItemNameRef = useRef('');
    const addItemDescriptionRef = useRef('');
    const addItemQuantityRef = useRef('');

    const handleClickAdd = () => {
        const quantity = parseInt(addItemQuantityRef.current.value, 10);
        if (isNaN(quantity) || quantity <= 0) return;
        const itemName = addItemNameRef.current.value;
        const itemDescription = addItemDescriptionRef.current.value;
        const existingItemIndex = inventory.findIndex(item => item.name === itemName);
        if (existingItemIndex !== -1) {
            const updatedInventory = [...inventory];
            updatedInventory[existingItemIndex].quantity += quantity;
            setInventory(updatedInventory);
        } else {
            const item = {
                name: itemName,
                description: itemDescription,
                quantity: quantity
            };
            setInventory(prevInventory => [...(prevInventory || []), item]);
        }
        setShaderFlag(false);
    };

    return(
        <>
            <h1 className="add-item-title">Agregar Item</h1>
            <div className="add-item-container">
                <h1 className="add-item-label">Nombre</h1>
                <input ref={addItemNameRef} className="add-item-input"/>
            </div>
            <div className="add-item-container">
                <h1 className="add-item-label">descripcion</h1>
                <input ref={addItemDescriptionRef} className="add-item-input"/>
            </div>
            <div className="add-item-container">
                <h1 className="add-item-label">cantidad</h1>
                <input ref={addItemQuantityRef} className="add-item-input"/>
            </div>
            <button className="add-item-button" onClick={handleClickAdd}>Agregar</button>
        </>
    )
}