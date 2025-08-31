import "./backgroundSelector.css"
import { useContext } from "react";
import { StatsContext } from "../../../context/statsContext";
import { GlobalsContext } from "../../../context/globalsContext";
import Backgrounds from "../../../data/backgrounds";

export default function BackgroundSelector() {
    const { setBackground } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext);
    return (
        <div className="background-selector-container">
            {Backgrounds.map(Background => (
                <div key={Background.name} className="background-container" onClick={()=>{setBackground(Background);setShaderFlag(false);}}>
                    <h1 className="background-title">{Background.name}</h1>
                </div>
            ))}
        </div>
    )
}