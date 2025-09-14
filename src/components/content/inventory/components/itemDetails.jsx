import "./itemDetails.css"
import { useContext } from "react"
import { GlobalsContext } from "../../../../context/globalsContext"
import ModInventoryItem from "./modInventoryItem";

export default function ItemDetails({item}) {
    const { setPopupName } = useContext(GlobalsContext);
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
            <button className="item-details-button"
                    onClick={()=>{setPopupName(<ModInventoryItem item={item}/>)}}>Modificar</button>
        </div>
    )
}