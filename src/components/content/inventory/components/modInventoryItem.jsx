import "./modInventoryItem"
import { useContext, useRef, useState } from "react"
import { StatsContext } from "../../../../context/statsContext";
import { GlobalsContext } from "../../../../context/globalsContext";
import ItemForm from "./itemForm";

export default function ModInventoryItem({item}){
    const { inventory ,setInventory } = useContext(StatsContext);
        const { setShaderFlag } = useContext(GlobalsContext)
        const handleClickMod = (item) => {
        modItem(item)
        }
        const modItem = (newItem) => {
            setInventory(prevInventory => {
                const updated = prevInventory.map(_item =>
                    _item.name === item.name ? newItem : _item
                );
                if (!updated.some(_item => _item.name === newItem.name)) {
                    updated.push(newItem);
                }
                return updated;
            });
            setShaderFlag(false);
        };
    
        return(
            <>
                <h1 className="add-item-title add-item-sepatator">Agregar Item</h1>
                <ItemForm item={item} handleItem={handleClickMod}/>
            </>
        )
    }