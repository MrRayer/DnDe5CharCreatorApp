import './showAbilityInfo.css';
import abilitiesAndSpells from '../../../data/abilitiesAndSpells';
import { useContext } from 'react';
import { GlobalsContext } from '../../../context/globalsContext';


export default function ShowAbilityInfo(){
    const { abilityToShow } = useContext(GlobalsContext);
    return (
    <div className='show-ability-info-container'>
        {abilityToShow !== "none" && (
            <div className='ability-info'>
                <h2>{abilitiesAndSpells[abilityToShow].name}</h2>
                <p>{abilitiesAndSpells[abilityToShow].description}</p>
            </div>
        )}
    </div>)
}