import './abilityOrSpell.css';
import abilitiesAndSpells from '../../../../data/abilitiesAndSpells';

export default function AbilityOrSpell({name, onClick}) {
    return (
        <div className='ability-or-spell-container' onClick={onClick}>
            {abilitiesAndSpells[name]?.name ?? name}
        </div>
    )
}