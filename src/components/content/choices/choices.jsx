import './choices.css';
import { useContext } from 'react';
import { StatsContext } from '../../../context/statsContext';
import { GlobalsContext } from '../../../context/globalsContext';
import Choice from './components/choice';
import ChoicePopup from '../../popups/choicePopup/choicePopup';
import AddTaL from '../../popups/addTaL/addTaL';

export default function Choices() {
    const { setShaderFlag, setPopupName, setChoosingType } = useContext(GlobalsContext);
    const { charChoices, setCharChoices } = useContext(StatsContext);
    const handleClickedChoice = (choice) => {
        setChoosingType(choice);
        setPopupName(<ChoicePopup/>);
        setShaderFlag(true);
    }
    const handleClickedToL = (choice) => {
        if (choice === "Tools") {
            if (charChoices.toolChoice <= 0){return;}
            setChoosingType("tools");
            setCharChoices(prevChoices => ({
                ...prevChoices,
                toolChoice: prevChoices.toolChoice - 1
            }));
        }
        if (choice === "Languages") {
            if (charChoices.languageChoice <= 0) {return;}
            setChoosingType("lang");
            setCharChoices(prevChoices => ({
                ...prevChoices,
                languageChoice: prevChoices.languageChoice - 1
            }));
        }
        setPopupName(<AddTaL/>);
        setShaderFlag(true);
    }
    return (
        <div className='choices-main-container'>
            <h1 className='choices-title'>choices</h1>
            <div className='choices-container'>
                <Choice title="Skills" ammount={charChoices.skillChoice} onClick={handleClickedChoice}/>
                <Choice title="Tools" ammount={charChoices.toolChoice} onClick={handleClickedToL}/>
                <Choice title="Languages" ammount={charChoices.languageChoice} onClick={handleClickedToL}/>
                <Choice title="cantrip" ammount={charChoices.cantripChoice} onClick={handleClickedChoice}/>
                {charChoices.spell1Choice !== 0 && <Choice title="lvl1" ammount={charChoices.spell1Choice} onClick={handleClickedChoice}/>}
            </div>
        </div>
    )
}