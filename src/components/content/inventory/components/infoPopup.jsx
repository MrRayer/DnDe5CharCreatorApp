import "./infoPopup.css"

export default function InfoPopup({flagSetter,content}) {
    return (
        <div className="info-popup-shader">
            <div className="info-popup-container">
                <p className="info-popup-content">{content}</p>
                <button className="info-popup-button" onClick={()=>flagSetter(false)}>Ok</button>
            </div>
        </div>
    )
}