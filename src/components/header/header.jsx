import "./header.css"
import { useContext } from "react"
import { StatsContext } from "../../context/statsContext"

export default function Header() {
    const { charStats } = useContext(StatsContext);
    return(
        <div className="header-main-container">
            <div className="logo-container"><img className="d20-logo" src="/img/d20green.png" alt="App Logo"/></div>
            <div className="name-container">
                <div
                className="textarea char-name-textarea"
                contentEditable="true"
                role="textbox"
                spellCheck="false">
                    {charStats["Name"]}
                </div>
            </div>
            <div className="class-container"><img className="class-logo" src="/img/ftrgreen.png" alt="App Logo"/></div>
        </div>
    );
}