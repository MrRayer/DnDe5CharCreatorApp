import './choices.css';
import { useContext } from 'react';
import { StatsContext } from '../../../context/statsContext';
import { GlobalsContext } from '../../../context/globalsContext';
import Choice from './components/choice';

export default function Choices() {
    const { setShaderFlag, setPopupName, setChoosingType } = useContext(GlobalsContext);
    const { charChoices } = useContext(StatsContext);
    const handleClickedChoice = (choice) => {
        setChoosingType(choice);
        setPopupName("choicePopup");
        setShaderFlag(true);
    }
    return (
        <div className='choices-main-container'>
            <h1 className='choices-title'>choices</h1>
            <div className='choices-container'>
                <Choice title="Skills" ammount={charChoices.skillChoice} onClick={handleClickedChoice}/>
                <Choice title="Tools" ammount={charChoices.toolChoice} onClick={handleClickedChoice}/>
                <Choice title="Languages" ammount={charChoices.languageChoice} onClick={handleClickedChoice}/>
                <Choice title="cantrip" ammount={charChoices.cantripChoice} onClick={handleClickedChoice}/>
                {charChoices.spell1Choice !== 0 && <Choice title="lvl1" ammount={charChoices.spell1Choice} onClick={handleClickedChoice}/>}
            </div>
        </div>
    )
}