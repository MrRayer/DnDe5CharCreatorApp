import './abilitiesAndSpells.css';
import { useState, useContext, useEffect } from 'react';
import abilitiesAndSpells from '../../../data/abilitiesAndSpells';
import { StatsContext } from '../../../context/statsContext';
import TypeButton from './components/typeButton';
import AbilityOrSpell from './components/abilityOrSpell';
import { GlobalsContext } from '../../../context/globalsContext';

export default function AbilitiesAndSpells() {
    const { setShaderFlag, setAbilityToShow, setPopupName } = useContext(GlobalsContext);
    const { charIdentity } = useContext(StatsContext);
    const [showType, setShowType] = useState(false);
    const [charTypes, setCharTypes] = useState([]);
    const setSelectedType = (type) => {
        console.log(charIdentity)
        setShowType(type);
    }
    const handleClickedAbilityOrSpell = (name) => {
        console.log("handle clicked ability or spell", name);
        setAbilityToShow(name);
        setShaderFlag(true);
        setPopupName("showAbilityInfo");
    }
    const reloadCharTypes = () => {
        let _charTypes = [];
        charIdentity.abilities.forEach(item => {
            const ability = abilitiesAndSpells[item];
            if (ability && !_charTypes.includes(ability.type)) {
                _charTypes = [..._charTypes, ability.type];
            }
        });
        charIdentity.spells.forEach(item => {
            const spell = abilitiesAndSpells[item];
            if (spell && !_charTypes.includes(spell.type)) {
                _charTypes = [..._charTypes, spell.type];
            }
        });
        setCharTypes(_charTypes);
    }
    useEffect(() => {
        reloadCharTypes();
    }, []);
    return (
        <div className="abilities-and-spells-main-container">
            <h1 className='abilities-and-spells-title'>Habilidades y Hechizos</h1>
            <div className='abilities-and-spells-type-selector-container'>
                {charTypes.map(type => <TypeButton key={type} type={type} onClick={setSelectedType}/>)}
            </div>
            <div className='abilities-and-spells-list-container'>
                {charIdentity.abilities.map(item => {
                    return showType === abilitiesAndSpells[item].type ? <AbilityOrSpell key={item} name={item} onClick={() => {handleClickedAbilityOrSpell(item)}} /> : null;
                })}
                {charIdentity.spells.map(item => {
                    return showType === abilitiesAndSpells[item].type ? <AbilityOrSpell key={item} name={item} onClick={() => {handleClickedAbilityOrSpell(item)}} /> : null;
                })}
            </div>
        </div>
    )
}