import './typeButton.css';

export default function TypeButton({ type, onClick }) {
    return (
        <div className="ability-type-button-container" onClick={() => onClick(type)}>
            <div className="ability-type-button-text">
                {type}
            </div>
        </div>
    )
}