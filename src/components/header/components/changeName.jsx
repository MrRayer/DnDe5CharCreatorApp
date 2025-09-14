import { useRef, useContext } from "react"
import "./changeName.css"
import { GlobalsContext } from "../../../context/globalsContext"
import { StatsContext } from "../../../context/statsContext"

export default function ChangeName() {
    const { setShaderFlag } = useContext(GlobalsContext);
    const { setCharIdentity, charIdentity } = useContext(StatsContext);
    const newName = useRef('')
    const handleChangeName = ()=>{
        setCharIdentity(prevIdentity => ({...prevIdentity, Name : newName.current.value}));
        setShaderFlag(false);
    }
    return (
        <div className="change-name-main-container">
            <h1 className="change-name-title">Cambiar nombre</h1>
            <input ref={newName} className="change-name-input" type="text" defaultValue={charIdentity.Name}/>
            <button className="change-name-button" onClick={handleChangeName}>Aceptar</button>
        </div>
    )
}