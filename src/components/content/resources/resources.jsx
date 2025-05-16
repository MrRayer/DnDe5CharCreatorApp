import Resource from "./components/resource"
import "./resources.css"
import { StatsContext } from "../../../context/statsContext"
import { useContext } from "react"

export default function Resources(){
    const { charResources, setCharResources, resetResources } = useContext(StatsContext)
    const handleMinusButtonClick = (index) => {
        if (charResources.current[index] > 0) {
            setCharResources(prevResources => {
                const newCurrent = [...prevResources.current];
                newCurrent[index] -= 1;
                return {
                    ...prevResources,
                    current: newCurrent
                };
            });
        }
    }
    const handleAddButtonClick = (index) => {
        if (charResources.current[index] < charResources.max[index]) {
            setCharResources(prevResources => {
                const newCurrent = [...prevResources.current];
                newCurrent[index] += 1;
                return {
                    ...prevResources,
                    current: newCurrent
                };
            });
        }
    }
    return(
        <div className="resources-container">
            <div className="resources-reset" onClick={()=>resetResources()}>Turno</div>
            <Resource
                name={"Accion"}
                max={charResources.max[0]}
                current={charResources.current[0]}
                addClickButton={()=>{handleAddButtonClick(0)}}
                minusClickButton={()=>{handleMinusButtonClick(0)}}
            />
            <Resource
                name={"Accion extra"}
                max={charResources.max[1]}
                current={charResources.current[1]}
                addClickButton={()=>{handleAddButtonClick(1)}}
                minusClickButton={()=>{handleMinusButtonClick(1)}}
            />
            {charResources.max[2] > 0 ? (
                <Resource
                    name="Hechizo nivel 1"
                    max={charResources.max[2]}
                    current={charResources.current[2]}
                    addClickButton={() => handleAddButtonClick(2)}
                    minusClickButton={() => handleMinusButtonClick(2)}
                />
            ) : null}
            {charResources.max[3] > 0 ? (
                <Resource
                    name="Hechizo nivel 2"
                    max={charResources.max[3]}
                    current={charResources.current[3]}
                    addClickButton={() => handleAddButtonClick(3)}
                    minusClickButton={() => handleMinusButtonClick(3)}
                />
            ) : null}
            {charResources.max[4] > 0 ? (
                <Resource
                    name="Hechizo nivel 3"
                    max={charResources.max[4]}
                    current={charResources.current[4]}
                    addClickButton={() => handleAddButtonClick(4)}
                    minusClickButton={() => handleMinusButtonClick(4)}
                />
            ) : null}
            {charResources.max[5] > 0 ? (
                <Resource
                    name="Hechizo nivel 4"
                    max={charResources.max[5]}
                    current={charResources.current[5]}
                    addClickButton={() => handleAddButtonClick(5)}
                    minusClickButton={() => handleMinusButtonClick(5)}
                />
            ) : null}
            {charResources.max[6] > 0 ? (
                <Resource
                    name="Hechizo nivel 5"
                    max={charResources.max[6]}
                    current={charResources.current[6]}
                    addClickButton={() => handleAddButtonClick(6)}
                    minusClickButton={() => handleMinusButtonClick(6)}
                />
            ) : null}
            {charResources.max[7] > 0 ? (
                <Resource
                    name="Hechizo nivel 6"
                    max={charResources.max[7]}
                    current={charResources.current[7]}
                    addClickButton={() => handleAddButtonClick(7)}
                    minusClickButton={() => handleMinusButtonClick(7)}
                />
            ) : null}
            {charResources.max[8] > 0 ? (
                <Resource
                    name="Hechizo nivel 7"
                    max={charResources.max[8]}
                    current={charResources.current[8]}
                    addClickButton={() => handleAddButtonClick(8)}
                    minusClickButton={() => handleMinusButtonClick(8)}
                />
            ) : null}
            {charResources.max[9] > 0 ? (
                <Resource
                    name="Hechizo nivel 8"
                    max={charResources.max[9]}
                    current={charResources.current[9]}
                    addClickButton={() => handleAddButtonClick(9)}
                    minusClickButton={() => handleMinusButtonClick(9)}
                />
            ) : null}
            {charResources.max[10] > 0 ? (
                <Resource
                    name="Hechizo nivel 9"
                    max={charResources.max[10]}
                    current={charResources.current[10]}
                    addClickButton={() => handleAddButtonClick(10)}
                    minusClickButton={() => handleMinusButtonClick(10)}
                />
            ) : null}
        </div>
    )
}