import "./itemDetails.css"
import { useContext } from "react"
import { GlobalsContext } from "../../../../context/globalsContext"
import { StatsContext } from "../../../../context/statsContext"
import ModInventoryItem from "./modInventoryItem";

export default function ItemDetails({item}) {
    const { setPopupName } = useContext(GlobalsContext);
    const { setInventory } = useContext(StatsContext);
    let timer;
    const addCharge = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(item.currentCharges == item.charges) {return;}
            item.currentCharges += 1;
            setInventory(prevInventory => prevInventory.map(invItem => {
                if (invItem.name === item.name) {
                    return { ...invItem, currentCharges: item.currentCharges };
                }
                return invItem;
            }));
        }, 100);
    }
    const removeCharge = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            if(item.currentCharges == 0) {return;}
            item.currentCharges -= 1;
            setInventory(prevInventory => prevInventory.map(invItem => {
                if (invItem.name === item.name) {
                    return { ...invItem, currentCharges: item.currentCharges };
                }
                return invItem;
            }));
        }, 100);
    }
    return (
        <div className="item-details-main-container">
            <h1 className="item-details-title item-details-top-separator">{item.name}</h1>
            {item?.ac ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">AC</h1>
                    <p className="item-details-content">{item.ac}</p>
                </div>
            :null}
            {item?.damage ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">Daño</h1>
                    <p className="item-details-content">{item.damage}</p>
                </div>
            :null}
            {item?.description ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">Descripcion</h1>
                    <p className="item-details-content">{item.description}</p>
                </div>
            :null}
            {item?.slot ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">Equipable en </h1>
                    <p className="item-details-content">{item.slot}</p>
                </div>
            :null}
            {item?.armorType ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">Tipo de armadura </h1>
                    <p className="item-details-content">{item.armorType}</p>
                </div>
            :null}
            {item?.charges ?
                <div className="item-details-container">
                    <h1 className="item-details-title item-details-top-separator">Contenido</h1>
                    <p className="item-details-content">{item.chargeDisplay}</p>
                    <p className="item-details-content">
                        <button className="item-details-charge-button" onClick={()=>{removeCharge()}}>-</button>
                        {item.currentCharges}/{item.charges}
                        <button className="item-details-charge-button" onClick={()=>{addCharge()}}>+</button>
                    </p>
                </div>
            :null}
            <button className="item-details-button"
                    onClick={()=>{setPopupName(<ModInventoryItem item={item}/>)}}>Modificar</button>
        </div>
    )
}