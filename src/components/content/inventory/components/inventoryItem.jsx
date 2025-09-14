import { useContext } from "react"
import "./inventoryItem.css"
import { StatsContext } from "../../../../context/statsContext"

export default function InventoryItem({ item, onClick }) {
    const { inventory, setInventory } = useContext(StatsContext);
    let timer;
    const modifyQuantity = (itemId, change) => {        
        clearTimeout(timer);
        timer = setTimeout(() => {
            setInventory(prevInventory => {
                const updatedInventory = prevInventory.map(i => {
                    if (i.name === itemId) {
                        const newQuantity = parseInt(i.quantity, 10) + change;
                        if (newQuantity <= 0) return null;
                        return { ...i, quantity: newQuantity };
                    }
                    return i;
                }).filter(i => i !== null);
                return updatedInventory;
            });
        }, 100);
    };

    return (
        <div className="inventory-item-container">
            <h1 className="inventory-item-name" onClick={()=>{onClick(item)}}>{item.name}</h1>
            <div className="inventory-item-quantity-container">
                <button
                    className="inventory-item-quantity-button"
                    onClick={() => modifyQuantity(item.name, -1)}
                >-</button>
                <h1 className="inventory-item-quantity">{item.quantity}</h1>
                <button
                    className="inventory-item-quantity-button"
                    onClick={() => modifyQuantity(item.name, 1)}
                >+</button>
            </div>
        </div>
    );
}