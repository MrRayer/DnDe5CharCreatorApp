import "./header.css"
import { useContext } from "react"
import { StatsContext } from "../../context/statsContext"
import { GlobalsContext } from "../../context/globalsContext";

export default function Header() {
    const { charIdentity } = useContext(StatsContext);
    const { setPopupName, setShaderFlag } = useContext(GlobalsContext);
    return(
        <div className="header-main-container">
            <div className="logo-container"><img className="d20-logo" src="/img/d20green.png" alt="App Logo"/></div>
            <div className="name-container">
                <textarea
                    className="char-name-textarea"
                    defaultValue={charIdentity["Name"]}
                    onChange={(e) => setCharIdentity(prevIdentity => ({
                        ...prevIdentity,
                        Name: e.target.value
                    }))}
                    spellCheck="false"
                />
            </div>
            <div className="class-container" onClick={() => {setPopupName("GlobalSelector");setShaderFlag(true)}}>
                <img className="class-logo" src="/img/ftrgreen.png" alt="App Logo"/>
                </div>
        </div>
    );
}