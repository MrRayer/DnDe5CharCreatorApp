import { useContext } from "react"
import "./inventoryItem.css"
import { InventoryContext } from "../../../../context/inventoryContext"

export default function InventoryItem({ item }) {
    const { inventory, setInventory } = useContext(InventoryContext);
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
            <h1 className="inventory-item-name">{item.name}</h1>
            <p className="inventory-item-description">{item.description}</p>
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