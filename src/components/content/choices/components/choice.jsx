import './choice.css'

export default function Choice({ title, ammount, onClick }) {
    return (
        <div className='choice-container' onClick={()=>{onClick(title)}}>
            <h1 className='choice-title'>{title}</h1>
            <h1 className='choice-ammount'>{ammount}</h1>
        </div>
    )
}