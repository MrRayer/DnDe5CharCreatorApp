import { useState } from "react";

export function OptionalInputComponent({flag,flagSetter,title,display}) {
    return (
        <div className="add-item-optional-container">
            <div className="add-item-optional-x-container"
                onClick={() => { flag ? flagSetter(false) : flagSetter(true) }}>
                <h1 className="add-item-optional-checks">{flag && "X"}</h1>
            </div>
            <div className="add-item-optional-content-container">
                <h1 className="add-item-label">{title}</h1>
                {flag && display}
            </div>
        </div>
    )
}

export function BasicInput({ref, type, defVal}){
    console.log("component rendered");
    return(
        <input ref={ref}
            className="add-item-input"
            type={type}
            defaultValue={defVal}/>
    )
}

export function ChargesInput({addItemChargesRef, addItemCurrentChargesRef, defCharge,
                            defCurrentCharge, addItemChargeDisplayRef, defChargeDisplay}){
    return(
        <>
            <h1 className="add-item-label text-left">Maximo</h1>
            <input ref={addItemChargesRef} className="add-item-charge-input" type="number" defaultValue={defCharge} />
            <h1 className="add-item-label text-left">Actual</h1>
            <input ref={addItemCurrentChargesRef} className="add-item-charge-input" type="number" defaultValue={defCurrentCharge} />
            <h1 className="add-item-label text-left">Unidades</h1>
            <input ref={addItemChargeDisplayRef} className="add-item-input" type="text" defaultValue={defChargeDisplay}/>
        </>
    )
}

export function EquipableItem({dropmenuSelection, setDropmenuSelection, armorType, setArmorType, handTags, setHandTags}) {
    const handTagsList = [{name:"twoHanded",display:"A dos manos"}];
    const [ dropmenuFlag, setDropmenuFlag] = useState(false);
    const armorTypes = [
        {name:"light",display:"Ligera"},
        {name:"medium",display:"Media"},
        {name:"heavy",display:"Pesada"},
    ];
    const equipableTypes = [
        {name:"ring",display:"Anillo"},
        {name:"amulet",display:"Amuleto"},
        {name:"head",display:"Cabeza"},
        {name:"armor",display:"Armadura"},
        {name:"boots",display:"Botas"},
        {name:"gloves",display:"Guantes"},
        {name:"hand",display:"Manos"}
    ];    
    const handleTagClick = (tag) => {
        if (handTags.includes(tag)) setHandTags(handTags.filter(_tag => _tag !== tag));
        else setHandTags(prevHandTags => [...prevHandTags, tag])
    };
    const equipableTypesDictionary = {
        none:"Seleccionar",
        ring:"Anillo",
        amulet:"Amuleto",
        head:"Cabeza",
        armor:"Armadura",
        boots:"Botas",
        gloves:"Guantes",
        hand:"Manos"        
    };
    return(
        <>
            <button className="add-item-equipable-dropmenu-button"
                onClick={() => { dropmenuFlag ? setDropmenuFlag(false) : setDropmenuFlag(true) }}>
                {equipableTypesDictionary[dropmenuSelection]}
            </button>
            {dropmenuFlag && <div className="add-item-equipable-dropmenu">
                {equipableTypes.map(type =>
                    <h1 className="add-item-dropmenu-item"
                    onClick={() => {setDropmenuSelection(type.name); setDropmenuFlag(false)}}
                    key={type.name}>
                        {type.display}
                    </h1>)
                }
            </div>}
            {dropmenuSelection === "armor" ? 
            <div className="add-item-armor-type-container">
                {armorTypes.map(type =>
                    <h1 className={`add-item-armor-type ${armorType === type.name ? "selected" : null}`}
                    onClick={()=>setArmorType(type.name)}
                    key={type.name}>
                        {type.display}
                    </h1>
                )}
            </div>
            : null}
            {dropmenuSelection === "hand" ? 
            <div className="add-item-armor-type-container">
                {handTagsList.map(tag =>
                    <h1 className={`add-item-armor-type ${handTags.some(_tag => tag.name === _tag) ? "selected" : null}`}
                    onClick={()=>handleTagClick(tag.name)}
                    key={tag.name}>
                        {tag.display}
                    </h1>
                )}
            </div>
            : null}
        </>
    )
}