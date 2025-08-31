import "./skillDetail.css"

export default function SkillDetail({title,parent,prof}){
    return(
        <div className="skill-detail-container" key={title}>
            <h1 className="skill-detail-title">{title}</h1>
            <div className="skill-detail-inside-container">
                <h2 className="skill-parent">{parent}</h2>
                <h2 className="skill-prof">{prof ? ("Competente"):null}</h2>
            </div>
        </div>
    )
}