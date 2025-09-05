import "./skills.css"
import _Skills from "../../../data/skills"
import SkillDetail from "./components/skillDetail"

export default function Skills(){
    return(
        <>
            {Object.entries(_Skills).map((item) => {return(<SkillDetail
                                            skill={item}
                                            key={item[1].name}
                                        />)}
            )}
        </>
    )
}