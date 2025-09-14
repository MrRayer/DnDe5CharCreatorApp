import "./itemDetails.css"

export default function ItemDetails({item}) {
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
        </div>
    )
}