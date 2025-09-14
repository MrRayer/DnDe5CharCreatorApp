import { useContext, useRef, useState } from "react"
import "./addInventoryItem.css"
import { StatsContext } from "../../../../context/statsContext";
import { GlobalsContext } from "../../../../context/globalsContext";

export default function AddInventoryItem(){
    const { inventory,setInventory } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext)
    const [ descriptionFlag, setDescriptionFlag] = useState(false);
    const [ acFlag, setAcFlag] = useState(false);
    const [ damageFlag, setDamageFlag] = useState(false);
    const [ equipableFlag, setEquipableFlag] = useState(false);
    const [ dropmenuFlag, setDropmenuFlag] = useState(false);
    const [ dropmenuSelection, setDropmenuSelection ] = useState("none");
    const addItemNameRef = useRef('');
    const addItemDescriptionRef = useRef('');
    const addItemQuantityRef = useRef('');
    const addItemAcRef = useRef('');
    const addItemDamageRef = useRef('');

    const handleClickAdd = () => {
        const quantity = parseInt(addItemQuantityRef.current.value, 10);
        if (isNaN(quantity) || quantity <= 0) return;
        const itemName = addItemNameRef.current.value;
        const itemDescription = addItemDescriptionRef.current.value;
        const itemAc = addItemAcRef.current.value;
        const itemDamage = addItemDamageRef.current.value;
        const itemEquipable = dropmenuSelection;
        const existingItemIndex = inventory.findIndex(item => item.name === itemName);
        if (existingItemIndex !== -1) {
            const updatedInventory = [...inventory];
            updatedInventory[existingItemIndex].quantity += quantity;
            setInventory(updatedInventory);
        } else {
            const item = {
                name: itemName,
                quantity: quantity,
                ...(descriptionFlag && {description: itemDescription}),
                ...(acFlag && {ac: itemAc}),
                ...(damageFlag && {damage : itemDamage}),
                ...(equipableFlag && {slot : itemEquipable})
            };
            setInventory(prevInventory => [...(prevInventory || []), item]);
        }
        setShaderFlag(false);
    };

    return(
        <>
            <h1 className="add-item-title add-item-sepatator">Agregar Item</h1>
            <div className="add-item-container">
                <h1 className="add-item-label">Nombre</h1>
                <input ref={addItemNameRef} className="add-item-input"/>
            </div>
            <div className="add-item-container">
                <h1 className="add-item-label">cantidad</h1>
                <input ref={addItemQuantityRef} className="add-item-input"/>
            </div>
            <div className="add-item-optional-container">
                <div className="add-item-optional-x-container"
                    onClick={()=>{descriptionFlag ? setDescriptionFlag(false) : setDescriptionFlag(true)}}>
                    <h1 className="add-item-optional-checks">{descriptionFlag && "X"}</h1>
                </div>
                <div className="add-item-optional-content-container">                    
                    <h1 className="add-item-label">descripcion</h1>
                    {descriptionFlag && <input ref={addItemDescriptionRef} className="add-item-input"/>}
                </div>
            </div>
            <div className="add-item-optional-container">
                <div className="add-item-optional-x-container"
                    onClick={()=>{acFlag ? setAcFlag(false) : setAcFlag(true)}}>
                    <h1 className="add-item-optional-checks">{acFlag && "X"}</h1>
                </div>
                <div className="add-item-optional-content-container">                    
                    <h1 className="add-item-label">AC</h1>
                    {acFlag && <input ref={addItemAcRef} className="add-item-input"/>}
                </div>
            </div>
            <div className="add-item-optional-container">
                <div className="add-item-optional-x-container"
                    onClick={()=>{damageFlag ? setDamageFlag(false) : setDamageFlag(true)}}>
                    <h1 className="add-item-optional-checks">{damageFlag && "X"}</h1>
                </div>
                <div className="add-item-optional-content-container">                    
                    <h1 className="add-item-label">Daño</h1>
                    {damageFlag && <input ref={addItemDamageRef} className="add-item-input"/>}
                </div>
            </div>
            <div className="add-item-optional-container">
                <div className="add-item-optional-x-container"
                    onClick={()=>{equipableFlag ? setEquipableFlag(false) : setEquipableFlag(true)}}>
                    <h1 className="add-item-optional-checks">{equipableFlag && "X"}</h1>
                </div>
                <div className="add-item-optional-content-container">
                    <h1 className="add-item-label">Equipable</h1>
                    {equipableFlag &&
                    <>
                        <button className="add-item-equipable-dropmenu-button"
                                onClick={()=>{dropmenuFlag ? setDropmenuFlag(false) : setDropmenuFlag(true)}}>
                                    {dropmenuSelection}
                        </button>
                        {dropmenuFlag && <div className="add-item-equipable-dropmenu">
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("ring");setDropmenuFlag(false)}}>ring</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("amulet");setDropmenuFlag(false)}}>amulet</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("head");setDropmenuFlag(false)}}>head</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("armor");setDropmenuFlag(false)}}>armor</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("boots");setDropmenuFlag(false)}}>boots</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("gloves");setDropmenuFlag(false)}}>gloves</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("mWeapon");setDropmenuFlag(false)}}>mWeapon</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("shield");setDropmenuFlag(false)}}>shield</h1>
                            <h1 className="add-item-dropmenu-item" onClick={()=>{setDropmenuSelection("rWeapon");setDropmenuFlag(false)}}>rWeapon</h1>
                        </div>}                        
                    </>                        
                    }
                </div>
            </div>
            <button className="add-item-button" onClick={handleClickAdd}>Agregar</button>
        </>
    )
}