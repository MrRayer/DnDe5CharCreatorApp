import { useRef, useState } from "react";
import InfoPopup from "./infoPopup";
import { EquipableItem, BasicInput, ChargesInput, OptionalInputComponent } from "./itemFormInputs";

export default function ItemForm({item, handleItem}) {
    const [ descriptionFlag, setDescriptionFlag] = useState(!!item?.description);
    const [ acFlag, setAcFlag] = useState(!!item?.ac);
    const [ damageFlag, setDamageFlag] = useState(!!item?.damage);
    const [ equipableFlag, setEquipableFlag] = useState(!!item?.slot);
    const [ chargesFlag, setChargesFlag] = useState(!!item?.charges);
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
    const addItemChargesRef = useRef('');
    const addItemCurrentChargesRef = useRef('');
    const addItemChargeDisplayRef = useRef('');
    const optionalInputs = [
        {
            flag:descriptionFlag,
            flagSetter:setDescriptionFlag,
            title:"Descripcion",
            display:<BasicInput ref={addItemDescriptionRef} type="text" defVal={item?.description || ""}/>
        },
        {
            flag:acFlag,
            flagSetter:setAcFlag,
            title:"AC",
            display:<BasicInput ref={addItemAcRef} type="number" defVal={item?.ac || ""}/>
        },
        {
            flag:damageFlag,
            flagSetter:setDamageFlag,
            title:"Daño",
            display:<BasicInput ref={addItemDamageRef} type="text" defVal={item?.damage || ""}/>
        },
        {
            flag:chargesFlag,
            flagSetter:setChargesFlag,
            title:"Cargas",
            display:<ChargesInput addItemChargesRef={addItemChargesRef} addItemCurrentChargesRef={addItemCurrentChargesRef}
                                defCharge={item?.charges || ""} defCurrentCharge={item?.currentCharges || ""}
                                addItemChargeDisplayRef={addItemChargeDisplayRef} defChargeDisplay={item?.chargeDisplay || ""}/>
        },
        {
            flag:equipableFlag,
            flagSetter:setEquipableFlag,
            title:"Equipable en",
            display:<EquipableItem dropmenuSelection={dropmenuSelection}
                                    setDropmenuSelection={setDropmenuSelection}
                                    armorType={armorType}
                                    setArmorType={setArmorType}
                                    handTags={handTags}
                                    setHandTags={setHandTags}/>
        }
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
        };
        if (chargesFlag) {
            const charges = Number(addItemChargesRef.current.value);
            const currentCharges = Number(addItemCurrentChargesRef.current.value);
            if (!Number.isInteger(charges) || charges <= 0) {
                setInfoPopupContent("Cargas debe contener solo numeros y no puede ser negativo");
                setInfoPopupFlag(true);
                return;
            };
            if (currentCharges > charges || currentCharges < 0) {
                setInfoPopupContent("Cargas Actuales debe ser menor o igual a cargas maximas y no puede ser negativo");
                setInfoPopupFlag(true);
                return;
            };
        };
        const newItem = {
                name: itemName,
                quantity: quantity,
                ...(descriptionFlag && { description: addItemDescriptionRef.current.value }),
                ...(acFlag && { ac: Number(addItemAcRef.current.value) }),
                ...(damageFlag && { damage: addItemDamageRef.current.value }),
                ...(equipableFlag && { slot: dropmenuSelection }),
                ...(dropmenuSelection === "armor" ? { armorType: armorType }:null),
                ...(handTags?.length > 0 ? { tags: handTags }:null),
                ...(chargesFlag && { charges: Number(addItemChargesRef.current.value),
                                     currentCharges: Number(addItemCurrentChargesRef.current.value),
                                     chargeDisplay: addItemChargeDisplayRef.current.value} )
            }
        handleItem(newItem)
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
                                        display={input.display}
            />)}
            <button className="add-item-button" onClick={handleClick}>{item?.name ? "Modificar":"Agregar"}</button>
            {infoPopupFlag && <InfoPopup flagSetter={setInfoPopupFlag} content={infoPopupContent}/>}
        </>
    )
}