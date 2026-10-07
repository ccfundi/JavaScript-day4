// 1. DOM Elements
const noteInput = document.getElementById("note-input")
const addBtn = document.getElementById("add-btn")
const notesList = document.getElementById("notes-list")
const clearAllBtn = document.getElementById("clear-all-btn")

// 2. Load saved notes from localStorage OR initialize as empty array
let notes = JSON.parse(localStorage.getItem("quickNotes")) || []

// 3. Save current notes state to localStorage

const saveToStorage = () =>{
    localStorage.setItem("quickNotes", JSON.stringify(notes))
}

// 4. Render notes list to DOM
const renderNotes = () =>{
    notesList.innerHTML = ""

    if (notes.length === 0){
        notesList.innerHTML = "<p style='color: #888;'>No saved notes yet.</p>";
        return
    }

    notes.forEach((note) =>{
        const li = document.createElement("li")

        const span = document.createElement("span")
        span.textContent = note.text

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.className = "delete-btn"

        // Delete note by matching unique ID
        deleteBtn.addEventListener("click", () =>{
            deleteNote(note.id)
        })

        li.appendChild(span)
        li.appendChild(deleteBtn)
        notesList.appendChild(li)
    })
}

// 5. Add Note Action
const addNote = () =>{
    const text = noteInput.value.trim()

    if (text !== ""){
        const newNote = {
            id: Date.now(),    // Unique numeric timestamp ID
            text: text
        }

        notes.push(newNote)
        saveToStorage()
        renderNotes()

        noteInput.value = ""
        noteInput.focus()
    }

    
}

// 6. Delete Single Note
const deleteNote = (idToDelete) => {
    notes = notes.filter((note) => note.id !== idToDelete)
    saveToStorage()
    renderNotes()
}

// 7. Clear All Notes
const clearAllNotes = () =>{
    notes = []
    localStorage.removeItem("quickNotes")
    renderNotes()
}

addBtn.addEventListener("click", addNote);

noteInput.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") addNote()
})

clearAllBtn.addEventListener("click", clearAllNotes)

// Initial Render on Page Load
renderNotes();