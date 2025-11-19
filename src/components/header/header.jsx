import "./header.css"
import { useContext, useEffect } from "react"
import { StatsContext } from "../../context/statsContext"
import { GlobalsContext } from "../../context/globalsContext";
import GlobalSelector from "../popups/globalSelector/globalSelector";
import DieRoll from "../popups/dieRoll/dieRoll";
import ChangeName from "./components/changeName";
import { useAutosave } from "../content/saveLoad/saveLoad";

export default function Header() {
    const { charIdentity } = useContext(StatsContext);
    const { setPopupName, setShaderFlag } = useContext(GlobalsContext);
    const autosave = useAutosave();
    useEffect(() => {
        const interval = setInterval(() => {
            autosave();
        }, 2 * 60 * 1000);

        return () => clearInterval(interval);
    }, [autosave]);
    return(
        <div className="header-main-container">
            <div className="logo-container">
                <img className="d20-logo" 
                    src={`${import.meta.env.BASE_URL}img/d20green.png`} alt="App Logo"
                    onClick={()=>{setPopupName(<DieRoll/>);setShaderFlag(true)}}/>
            </div>
            <div className="name-container" onClick={()=>{setPopupName(<ChangeName/>);setShaderFlag(true)}}>
                <h1 className="char-name">{charIdentity["Name"]}</h1>
            </div>
            <div className="class-logo-container" onClick={() => {setPopupName(<GlobalSelector/>);setShaderFlag(true)}}>
                <img className="class-logo" src={`${import.meta.env.BASE_URL}img/hamburguer.png`} alt="Menu Logo"/>
                </div>
        </div>
    );
}