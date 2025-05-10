import "./dieRoll.css";
import Die from "./components/die";
import { useState } from "react";

export default function DieRoll() {
    let timer;
    const RollDie = (dieNumber) => {        
        clearTimeout(timer);
        timer = setTimeout(() => {
            const result = Math.floor(Math.random() * dieNumber) + 1;
            setPrevRoll(roll);
            setDie2(`${die1}`);
            setRoll(result);
            setDie1(`D${dieNumber}`);
        }, 100);
    };
    const [roll, setRoll] = useState(0);
    const [prevRoll, setPrevRoll] = useState(0);
    const [die1, setDie1] = useState("NA");
    const [die2, setDie2] = useState("NA");
    return (
        <div className="dieroll-container">
            <div className="die-container">
                <Die dieNumber={4} onClick={()=>RollDie(4)}/>
                <Die dieNumber={6} onClick={()=>RollDie(6)}/>
                <Die dieNumber={8} onClick={()=>RollDie(8)}/>
                <Die dieNumber={10} onClick={()=>RollDie(10)}/>
                <Die dieNumber={12} onClick={()=>RollDie(12)}/>
                <Die dieNumber={20} onClick={()=>RollDie(20)}/>
                <Die dieNumber={100} onClick={()=>RollDie(100)}/>
            </div>
            <div className="result-container">
                <div className="single-result-container">
                    <h1 className="result-title">{die1}</h1>
                    <h1 className="result-text">{roll}</h1>
                </div>
                <div className="single-result-container">
                    <h1 className="result-title">{die2}</h1>
                    <h1 className="result-text">{prevRoll}</h1>
                </div>
            </div>
        </div>
    );
}
