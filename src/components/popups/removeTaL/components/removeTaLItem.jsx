import "./removeTaLItem.css"

export default function RemoveTaLItem({item, key, callback}){
    return(
        <div className="remove-talitem-container" key={key}>
            <h1 className="remove-talitem-name">{item}</h1>
            <button className="remove-talitem-button" onClick={()=>callback(item)}>X</button>
        </div>
    );
}