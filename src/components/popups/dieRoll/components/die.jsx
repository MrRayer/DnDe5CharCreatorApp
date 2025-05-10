import "./die.css";

export default function Die({dieNumber, onClick}) {
    return (
        <div className="single-die-container" onClick={onClick}>
            <h1>Roll: {dieNumber}</h1>
        </div>
    )
}