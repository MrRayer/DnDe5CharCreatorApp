import "./itemForm.css"
import { useRef, useState } from "react";
import OptionalInputComponent from "./optionalInputComponent";
import InfoPopup from "./infoPopup";

export default function ItemForm({item, handleItem}) {    
    const [ descriptionFlag, setDescriptionFlag] = useState(!!item?.description);
    const [ acFlag, setAcFlag] = useState(!!item?.ac);
    const [ damageFlag, setDamageFlag] = useState(!!item?.damage);
    const [ equipableFlag, setEquipableFlag] = useState(!!item?.slot);
    const [ dropmenuFlag, setDropmenuFlag] = useState(false);
    const [ dropmenuSelection, setDropmenuSelection ] = useState(item?.slot || "none");
    const [ armorType, setArmorType ] = useState("light");
    const [ handTags, setHandTags ] = useState(item?.tags ? [...item?.tags]:[]);
    const [ infoPopupFlag, setInfoPopupFlag ] = useState(false)
    const [ infoPopupContent, setInfoPopupContent ] = useState(false)
    const addItemNameRef = useRef('');
    const addItemDescriptionRef = useRef('');
    const addItemQuantityRef = useRef('');
    const addItemAcRef = useRef('');
    const addItemDamageRef = useRef('');
    const handTagsList = [
        {name:"twoHanded",display:"A dos manos"}
    ]
    console.log(handTags);
    const armorTypes = [
        {name:"light",display:"Ligera"},
        {name:"medium",display:"Media"},
        {name:"heavy",display:"Pesada"},
    ]
    const equipableTypes = [
        {name:"ring",display:"Anillo"},
        {name:"amulet",display:"Amuleto"},
        {name:"head",display:"Cabeza"},
        {name:"armor",display:"Armadura"},
        {name:"boots",display:"Botas"},
        {name:"gloves",display:"Guantes"},
        {name:"hand",display:"Arma"}
    ]
    const optionalInputs = [
        {
            flag:descriptionFlag,
            flagSetter:setDescriptionFlag,
            title:"Descripcion",
            ref:addItemDescriptionRef,
            type:"text",
            defVal:item?.description || ""
        },
        {
            flag:acFlag,
            flagSetter:setAcFlag,
            title:"AC",
            ref:addItemAcRef,
            type:"number",
            defVal:item?.ac || ""
        },
        {
            flag:damageFlag,
            flagSetter:setDamageFlag,
            title:"Daño",
            ref:addItemDamageRef,
            type:"text",
            defVal:item?.damage || ""
        },
    ]
    const handleClick = () => {
        const itemName = addItemNameRef.current.value;
        const quantity = Number(addItemQuantityRef.current.value);
        if (itemName === "") {
            setInfoPopupContent("Nombre no puede estar vacio");
            setInfoPopupFlag(true);
            return;
        };
        if (!Number.isInteger(quantity) || quantity <= 0) {
            setInfoPopupContent("Cantidad debe contener solo numeros y debe ser mayor a cero");
            setInfoPopupFlag(true);
            return;
        };
        if (acFlag) {
            const ac = Number(addItemAcRef.current.value);
            if (!Number.isInteger(ac) || ac <= 0) {
                setInfoPopupContent("AC debe contener solo numeros y debe ser mayor a cero");
                setInfoPopupFlag(true);
                return;
            };
        }
        const newItem = {
                name: itemName,
                quantity: quantity,
                ...(descriptionFlag && { description: addItemDescriptionRef.current.value }),
                ...(acFlag && { ac: Number(addItemAcRef.current.value) }),
                ...(damageFlag && { damage: addItemDamageRef.current.value }),
                ...(equipableFlag && { slot: dropmenuSelection }),
                ...(dropmenuSelection === "armor" ? { armorType: armorType }:null),
                ...(handTags?.length > 0 ? { tags: handTags }:null)
            }
        handleItem(newItem)
    }
    const handleTagClick = (tag) => {
        if (handTags.includes(tag)) setHandTags(handTags.filter(_tag => _tag !== tag));
        else setHandTags(prevHandTags => [...prevHandTags, tag])
    }
    return(
        <>
            <div className="add-item-container">
                <h1 className="add-item-label">Nombre</h1>
                <input ref={addItemNameRef}
                className="add-item-input"
                type="text"
                defaultValue={item?.name || ""}/>
            </div>
            <div className="add-item-container">
                <h1 className="add-item-label">cantidad</h1>
                <input
                ref={addItemQuantityRef}
                className="add-item-input"
                type="number"
                min="1"
                defaultValue={item?.quantity || ""}/>
            </div>
            {optionalInputs.map(input =>
                <OptionalInputComponent key={input.title}
                                        flag={input.flag}
                                        flagSetter={input.flagSetter}
                                        title={input.title}
                                        ref={input.ref}
                                        type={input.type}
                                        defVal={input.defVal}
            />)}
            <div className="add-item-optional-container">
                <div className="add-item-optional-x-container"
                    onClick={() => { equipableFlag ? setEquipableFlag(false) : setEquipableFlag(true) }}>
                    <h1 className="add-item-optional-checks">{equipableFlag && "X"}</h1>
                </div>
                <div className="add-item-optional-content-container">
                    <h1 className="add-item-label">Equipable</h1>
                    {equipableFlag &&
                        <>
                            <button className="add-item-equipable-dropmenu-button"
                                onClick={() => { dropmenuFlag ? setDropmenuFlag(false) : setDropmenuFlag(true) }}>
                                {dropmenuSelection}
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
                    }
                </div>
            </div>
            <button className="add-item-button" onClick={handleClick}>{item?.name ? "Modificar":"Agregar"}</button>
            {infoPopupFlag && <InfoPopup flagSetter={setInfoPopupFlag} content={infoPopupContent}/>}
        </>
    )
}