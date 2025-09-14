import "./modInventoryItem"
import { useContext, useRef, useState } from "react"
import { StatsContext } from "../../../../context/statsContext";
import { GlobalsContext } from "../../../../context/globalsContext";

export default function ModInventoryItem({item}){
    const { inventory ,setInventory } = useContext(StatsContext);
        const { setShaderFlag } = useContext(GlobalsContext)
        const [ descriptionFlag, setDescriptionFlag] = useState(!!item?.description);
        const [ acFlag, setAcFlag] = useState(!!item?.ac);
        const [ damageFlag, setDamageFlag] = useState(!!item?.damage);
        const [ equipableFlag, setEquipableFlag] = useState(!!item?.slot);
        const [ dropmenuFlag, setDropmenuFlag] = useState(false);
        const [ dropmenuSelection, setDropmenuSelection ] = useState(item?.slot || "none");
        const addItemNameRef = useRef('');
        const addItemDescriptionRef = useRef('');
        const addItemQuantityRef = useRef('');
        const addItemAcRef = useRef('');
        const addItemDamageRef = useRef('');
    
        const handleClickMod = () => {
            const quantity = Number(addItemQuantityRef.current.value);
            if (!Number.isInteger(quantity) || quantity <= 0) return;

            if (acFlag) {
                const ac = Number(addItemAcRef.current.value);
                if (!Number.isInteger(ac) || ac <= 0) return;
            }
            const newItem = {
                name: addItemNameRef.current.value,
                quantity,
                ...(descriptionFlag && { description: addItemDescriptionRef.current.value }),
                ...(acFlag && { ac: parseInt(addItemAcRef.current.value, 10) }),
                ...(damageFlag && { damage: addItemDamageRef.current.value }),
                ...(equipableFlag && { slot: dropmenuSelection })
            };
            setInventory(prevInventory => {
                const updated = prevInventory.map(_item =>
                    _item.name === item.name ? newItem : _item
                );
                if (!updated.some(_item => _item.name === item.name)) {
                    updated.push(newItem);
                }
                return updated;
            });
            setShaderFlag(false);
        };
    
        return(
            <>
                <h1 className="add-item-title add-item-sepatator">Modificar Item</h1>
                <div className="add-item-container">
                    <h1 className="add-item-label">Nombre</h1>
                    <input
                        ref={addItemNameRef}
                        className="add-item-input"
                        type="text"
                        defaultValue={item.name}
                    />
                </div>
                <div className="add-item-container">
                    <h1 className="add-item-label">cantidad</h1>
                    <input
                        ref={addItemQuantityRef}
                        className="add-item-input"
                        type="number"
                        min="1"
                        defaultValue={item.quantity}
                    />
                </div>
                <div className="add-item-optional-container">
                    <div className="add-item-optional-x-container"
                        onClick={() => { descriptionFlag ? setDescriptionFlag(false) : setDescriptionFlag(true) }}>
                        <h1 className="add-item-optional-checks">{descriptionFlag && "X"}</h1>
                    </div>
                    <div className="add-item-optional-content-container">
                        <h1 className="add-item-label">descripcion</h1>
                        {descriptionFlag && <input
                            ref={addItemDescriptionRef}
                            className="add-item-input"
                            type="text"
                            defaultValue={item?.description || ""}
                        />}
                    </div>
                </div>
                <div className="add-item-optional-container">
                    <div className="add-item-optional-x-container"
                        onClick={() => { acFlag ? setAcFlag(false) : setAcFlag(true) }}>
                        <h1 className="add-item-optional-checks">{acFlag && "X"}</h1>
                    </div>
                    <div className="add-item-optional-content-container">
                        <h1 className="add-item-label">AC</h1>
                        {acFlag && <input
                            ref={addItemAcRef}
                            className="add-item-input"
                            type="number"
                            min="1"
                            defaultValue={item?.ac || ""}
                        />}
                    </div>
                </div>
                <div className="add-item-optional-container">
                    <div className="add-item-optional-x-container"
                        onClick={() => { damageFlag ? setDamageFlag(false) : setDamageFlag(true) }}>
                        <h1 className="add-item-optional-checks">{damageFlag && "X"}</h1>
                    </div>
                    <div className="add-item-optional-content-container">
                        <h1 className="add-item-label">Daño</h1>
                        {damageFlag && <input
                            ref={addItemDamageRef}
                            className="add-item-input"
                            type="text"
                            defaultValue={item?.damage || ""}
                        />}
                    </div>
                </div>
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
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("ring"); setDropmenuFlag(false) }}>ring</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("amulet"); setDropmenuFlag(false) }}>amulet</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("head"); setDropmenuFlag(false) }}>head</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("armor"); setDropmenuFlag(false) }}>armor</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("boots"); setDropmenuFlag(false) }}>boots</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("gloves"); setDropmenuFlag(false) }}>gloves</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("mWeapon"); setDropmenuFlag(false) }}>mWeapon</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("shield"); setDropmenuFlag(false) }}>shield</h1>
                                    <h1 className="add-item-dropmenu-item" onClick={() => { setDropmenuSelection("rWeapon"); setDropmenuFlag(false) }}>rWeapon</h1>
                                </div>}
                            </>
                        }
                    </div>
                </div>
                <button className="add-item-button" onClick={handleClickMod}>Modificar</button>
            </>
        )
    }