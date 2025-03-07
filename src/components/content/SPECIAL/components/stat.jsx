import "./stat.css"

export default function Stat({statName, statAmmount, plus, minus}){
    const calculateModifier = () => {
        const mod = Math.floor((statAmmount-10)/2)
        if (mod > 0) return `+${mod}`;
        else return mod;
    }
    return(
        <div className="stat-container">
            <h1 className="stat-name">{statName}</h1>
            <h1 className="stat-modifier">{calculateModifier()}</h1>
            <div className="stat-number-container">
                <h2 className="stat-button" onClick={minus}>-</h2>
                <h2 className="stat-number">{statAmmount}</h2>
                <h2 className="stat-button" onClick={plus}>+</h2>
            </div>
        </div>
    )
}