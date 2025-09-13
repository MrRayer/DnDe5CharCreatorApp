import "./equipment.css"
import { useContext } from "react"
import { StatsContext } from "../../../context/statsContext"
import { GlobalsContext } from "../../../context/globalsContext";
import EquipmentPopup from "./components/equipmentPopup";

export default function Equipment(){
    const { equipment } = useContext(StatsContext);
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext);
    const handleEquipmentClick = (type,slot) => {
        setPopupName(<EquipmentPopup selected={slot}/>);
        setShaderFlag(true);
    }
    return(
        <div className="equipment-container">
            <h1 className="equipment-title">Equipamiento</h1>
            <div className="equipment-manequin-main-container">
                <div className="equipment-manequin-row-1">
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.ring1 !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("ring","ring1")}>
                            <img className="equipment-logo" 
                                src={`${import.meta.env.BASE_URL}img/ring.png`}
                                alt="Ring"
                            />
                        </div>
                        <h1 className="equipment-manequin-square-title">Anillo 1</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.head !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("helmet","head")}>
                            <img className="equipment-logo" 
                                src={`${import.meta.env.BASE_URL}img/helmet.png`}
                                alt="Helm"
                            />
                        </div>
                        <h1 className="equipment-manequin-square-title">Cabeza</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.ring2 !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("ring","ring2")}>
                            <img className="equipment-logo" 
                                src={`${import.meta.env.BASE_URL}img/ring.png`}
                                alt="Ring"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Anillo 2</h1>
                    </div>
                </div>
                <div className="equipment-manequin-row-2">
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.amulet !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("amulet","amulet")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/amulet.png`}
                                alt="Amulet"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Amuleto</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.armor !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("armor","armor")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/armor.png`}
                                alt="Armor"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Armadura</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.gloves !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("gloves","gloves")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/gloves.png`}
                                alt="Gloves"
                            />
                        </div>
                        <h1 className="equipment-manequin-square-title">Guantes</h1>
                    </div>
                </div>
                <div className="equipment-manequin-row-3">
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.boots !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("boots","boots")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/boots.png`}
                                alt="Boots"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Botas</h1>
                    </div>
                </div>
                <div className="equipment-manequin-row-4">
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.mWeapon !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("mWeapon","mWeapon")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/mWeapon.png`}
                                alt="Melee"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Melee</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.rWeapon !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("rWeapon","rWeapon")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/rWeapon.png`}
                                alt="Range"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">A Distancia</h1>
                    </div>
                    <div className="equipment-manequin-square-container">
                        <div className={`equipment-manequin-square ${
                            equipment.shield !== "none" ? "equipment-invert" : null
                        }`}
                            onClick={()=>handleEquipmentClick("shield","shield")}>
                            <img className="equipment-logo"
                                src={`${import.meta.env.BASE_URL}img/shield.png`}
                                alt="Shield"
                            />                            
                        </div>
                        <h1 className="equipment-manequin-square-title">Escudo</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}