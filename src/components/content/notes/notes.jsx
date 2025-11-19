import "./notes.css"
import { useContext, useState } from "react"
import { StatsContext } from "../../../context/statsContext"
import { GlobalsContext } from "../../../context/globalsContext"
import NoteForm from "./noteForm"

export default function Notes() {
    const { notes, setNotes } = useContext(StatsContext);
    const [ showNoteContent, setShowNoteContent ] = useState("");
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext);
    const handleAddNote = (index, note) => {
        setPopupName(<NoteForm saveNote={saveNote} deleteNote={deleteNote} index={index} note={note}/>);
        setShaderFlag(true);
    }
    const saveNote = (index, note) => {
        if(index == null){
            setNotes(prevNotes => [...prevNotes, note]);            
        } else {
            setNotes(prevNotes => prevNotes.map((n, i) => i === index ? note : n));
        }
        setShaderFlag(false);
        setPopupName(null);
    }
    const deleteNote = (index) => {
        setShaderFlag(false);
        setPopupName(null);
        setNotes(prevNotes => prevNotes.filter((_, i) => i !== index));
    }
    return (
        <div className="notes-main-container">
            <h1 className="notes-title">Notas</h1>
            <div className="notes-content-container">
                <button className="notes-add-button" onClick={()=>{handleAddNote(null, null)}}>Agregar nota</button>
                {notes.map((note, index) => (
                    <div key={index} className="note-item">
                        <h2 className="note-title">{note.title}</h2>
                        <button className="collapse-button" onClick={() => setShowNoteContent(showNoteContent === index ? "" : index)}>
                            {showNoteContent === index ? "∧" : "∨"}
                        </button>
                        <p className={showNoteContent === index ? "note-content" : "note-content-hidden"} onClick={()=>{handleAddNote(index, note)}}>
                            {note.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}