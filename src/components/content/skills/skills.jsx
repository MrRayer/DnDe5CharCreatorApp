import "./skills.css"
import { useContext } from "react"
import { StatsContext } from "../../../context/statsContext"
import _Skills from "../../../data/skills"
import SkillDetail from "./components/skillDetail"

export default function Skills(){
    const { charIdentity } = useContext(StatsContext);
    const getAtributeName = ["Fue","Des","Cons","Int","Sab","Car"]
    console.log(Object.entries(_Skills)[1][0])
    return(
        <>
            {Object.entries(_Skills).map((item) => {return(<SkillDetail
                                            title={item[1].name}
                                            parent={getAtributeName[item[1].parent]}
                                            prof={charIdentity.skills.includes(item[0])}
                                        />)}
            )}
        </>
    )
}