import { useRef } from "react"

export default function NoteForm({saveNote, deleteNote, index, note}) {
    const titleRef = useRef();
    const contentRef = useRef();
    const handleSave = () => {
        const newNote = {
            title: titleRef.current.value,
            content: contentRef.current.value
        };
        saveNote(index, newNote);        
    };

    return(
        <div className="note-form-main-container">
            <h1 className="note-form-title">Titulo</h1>
            <input className="note-form-title-input" type="text" ref={titleRef} defaultValue={note ? note.title : ""}/>
            <h1 className="note-form-title">Contenido</h1>
            <textarea className="note-form-content-input" ref={contentRef} defaultValue={note ? note.content : ""} />
            <button className="note-form-save-button" onClick={handleSave}>Guardar</button>
            {index != null && <button className="note-form-save-button" onClick={() => deleteNote(index)}>Eliminar</button>}
        </div>
    )
}