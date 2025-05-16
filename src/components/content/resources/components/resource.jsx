import "./resource.css"

export default function Resource({name,max,current,addClickButton,minusClickButton}){
    return(
        <div className="resource-container">
            <h1 className="resource-label">{name}</h1>
            <div className="resource-numbers-container">
                <h1 className="resource-current">{current}</h1>
                <h1 className="resource-max">{max}</h1>
            </div>
            <div className="resource-control-container">
                <div className="res-button" onClick={minusClickButton}>-</div>
                <div className="res-button res-button-add" onClick={addClickButton}>+</div>
            </div>
        </div>
    )
}