import { useContext } from "react"
import "./calculatedStats.css"
import { StatsContext } from "../../../context/statsContext"

export default function CalculatedStats(){
    const { charStats } = useContext(StatsContext);
    const HP = 10 + (Math.floor((charStats["Constitution"] - 10) / 2) * charStats["Level"]) + ((charStats["Level"] - 1) * 6);
    const ACN = 10 + Math.floor((charStats["Dexterity"] - 10) / 2);
    const AC = ACN + charStats["ACA"] + charStats["ACS"];
    const Initiative = () => {
        const Ini = Math.floor((charStats["Dexterity"] - 10) / 2);
        if (Ini > 0) return `+${Ini}`;
        else return Ini;
    }
    const NatP = 12 + Math.floor((charStats["Wisdom"] - 10) / 2) + Math.floor(charStats["Level"] / 4);
    return(
        <div className="calculated-stats-main-container">
            <div className="HP-container">
                <h1 className="HP-title">HP</h1>
                <div className="current-HP-container">
                    <div
                    className="textarea current-HP-text"
                    contentEditable="true"
                    role="textbox"
                    spellCheck="false">
                        {HP}
                    </div>
                    <h1>/</h1>
                    <h1 className="max-HP">{HP}</h1>
                </div>
            </div>
            <div className="AC-container">
                <div className="current-AC-container">
                    <h1 className="AC-title">AC</h1>
                    <h1 className="current-AC">{AC}</h1>
                </div>
                <div className="AC-details-container">
                    <div className="AC-nat-container">
                        <h1>Natural</h1>
                        <div className="AC">
                            {ACN}
                        </div>
                    </div>
                    <div className="AC-arm-container">
                        <h1>Armadura</h1>
                        <div className="AC">{charStats["ACA"]}</div>
                    </div>
                    <div className="AC-shield-container">
                        <h1>Escudo</h1>
                        <div className="AC">{charStats["ACS"]}</div>
                    </div>
                </div>
            </div> 
            <div className="ini-per-container">
                <div className="ini-container">
                    <h1>Iniciativa</h1>
                    <div className="AC">{Initiative()}</div>
                </div>
                <div className="per-container">
                    <h1>Natural</h1>
                    <h1>Perception</h1>
                    <div className="AC">{NatP}</div>
                </div>
            </div>
        </div>
    )
}