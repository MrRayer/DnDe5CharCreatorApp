import './choicePopup.css';
import { useContext } from 'react';
import { StatsContext } from '../../../context/statsContext';
import { GlobalsContext } from '../../../context/globalsContext';
import { Cantrips } from '../../../data/cantripList';

export default function ChoicePopup() {
    const { charIdentity, addSpell } = useContext(StatsContext);
    const { choosingType, setShaderFlag } = useContext(GlobalsContext);
    const handleClickedSpellOrCantrip = (SpellOrCantrip, type) => {
        addSpell(SpellOrCantrip, type);
        setShaderFlag(false);
    };
    return (
        <div className='choice-popup-container'>
            {(choosingType === "cantrip") &&
                Object.entries(Cantrips).map(([key, spell]) =>{
                    return (
                    spell.type === choosingType &&
                    spell.classes.includes(charIdentity.Class) &&
                    !charIdentity.spells.includes(key) ? (
                        <div key={spell.name} onClick={() => {handleClickedSpellOrCantrip(key, "cantrip")}}>{spell.name}</div>
                    ) : null)}
            )}
        </div>
);
}