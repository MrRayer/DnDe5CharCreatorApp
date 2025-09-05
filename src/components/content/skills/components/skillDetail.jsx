import "./skillDetail.css"
import { useContext } from "react";
import { StatsContext } from "../../../../context/statsContext";

export default function SkillDetail({skill}){
    const { charIdentity, calcStat, getProffBonus } = useContext(StatsContext);
    const getAtributeName = ["Fue","Des","Cons","Int","Sab","Car"]
    const skillComp = charIdentity.skills.includes(skill[0]);
    const skillMod = Math.floor((calcStat(skill[1].parent)-10)/2)+(skillComp ? getProffBonus() : 0);
    return(
        <div className="skill-detail-container" key={skill[1].name}>
            <h1 className="skill-detail-title">{skill[1].name}</h1>
            <div className="skill-detail-inside-container">
                <h2 className="skill-parent">{getAtributeName[skill[1].parent]}</h2>
                <h2 className="skill-mod">{skillMod}</h2>
                <h2 className="skill-prof">{skillComp ? ("Competente"):null}</h2>
            </div>
        </div>
    )
}