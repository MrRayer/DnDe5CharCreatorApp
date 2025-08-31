import './choicePopup.css';
import { useContext } from 'react';
import { StatsContext } from '../../../context/statsContext';
import { GlobalsContext } from '../../../context/globalsContext';
import { Cantrips } from '../../../data/cantripList';
import { Spells1 } from '../../../data/spells1List';
import Skills from '../../../data/skills';

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
                        <div key={spell.name}
                            onClick={() => {handleClickedSpellOrCantrip(key, "cantrip")}}
                            className="choice-popup-option">{spell.name}</div>
                    ) : null)}
            )}
            {(choosingType === "lvl1") &&
                Object.entries(Spells1).map(([key, spell]) =>{
                    return (
                    spell.type === choosingType &&
                    spell.classes.includes(charIdentity.Class) &&
                    !charIdentity.spells.includes(key) ? (
                        <div key={spell.name}
                            onClick={() => {handleClickedSpellOrCantrip(key, "lvl1")}}
                            className="choice-popup-option">{spell.name}</div>
                    ) : null)}
            )}
            {(choosingType === "Skills") &&
                Object.entries(Skills).map((skill) =>{
                    return (
                    skill[1].classes.includes(charIdentity.Class) &&
                    !charIdentity.skills.includes(skill[0]) ? (
                        <div key={skill[1].name}
                            onClick={() => {handleClickedSpellOrCantrip(skill[0], "skill")}}
                            className="choice-popup-option">{skill[1].name}</div>
                    ) : null)}
            )}
        </div>
);
}