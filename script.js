let addNoteButton = document.getElementById("addNote");
let notemodel = document.getElementById("noteModel");
let closeModelButton = document.getElementById("closeModel");
let noteTitle = document.getElementById("noteTitle");
let noteDescription = document.getElementById("noteDescription");
let saveNoteButton = document.getElementById("saveNote");

let editingNote = null;
let notes = [];

// Open modal
addNoteButton.addEventListener("click", function () {
    editingNote = null;
    noteTitle.value = "";
    noteDescription.value = "";
    notemodel.style.display = "flex";
    noteTitle.focus();
});

// Close modal
closeModelButton.addEventListener("click", function () {
    notemodel.style.display = "none";
});

// Close modal on outside click
window.addEventListener("click", function (e) {
    if (e.target === notemodel) {
        notemodel.style.display = "none";
    }
});

// CREATE + UPDATE
saveNoteButton.addEventListener("click", async function () {
    if (!noteTitle.value || !noteDescription.value) {
        alert("Enter title & description");
        return;
    }

    try {
        let url = "http://localhost:5001/notes";
        let method = "POST";

        if (editingNote) {
            url = `http://localhost:5001/notes/${editingNote}`;
            method = "PUT";
        }

        await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: noteTitle.value,
                content: noteDescription.value
            })
        });

        editingNote = null;
        notemodel.style.display = "none";
        loadNotes();
    } catch (err) {
        console.error("ERROR:", err);
    }
});

// DISPLAY NOTES
function displayNotes() {
    let notesCont = document.getElementById("notesCont");
    notesCont.innerHTML = "";

    if (notes.length === 0) {
        notesCont.innerHTML = "<p>No notes yet. Create one 🚀</p>";
        return;
    }

    notes.sort((a, b) => b.isPinned - a.isPinned);

    notes.forEach(note => {
        let noteDiv = document.createElement("div");
        noteDiv.className = note.isPinned ? "note pinned" : "note";

        let titleIconCont = document.createElement("div");
        titleIconCont.className = "titleIconCont";

        let pNoteTitle = document.createElement("p");
        pNoteTitle.innerText = note.noteTitle;

        let btnCont = document.createElement("div");

        let pinBtn = document.createElement("i");
        pinBtn.className = note.isPinned ? "fa-solid fa-star" : "fa-regular fa-star";
        pinBtn.addEventListener("click", () => togglePin(note.noteID));

        let editBtn = document.createElement("i");
        editBtn.className = "fa-solid fa-pencil";
        editBtn.addEventListener("click", () => editNote(note.noteID));

        let deleteBtn = document.createElement("i");
        deleteBtn.className = "fa-regular fa-trash-can";
        deleteBtn.addEventListener("click", () => deleteNote(note.noteID));

        btnCont.appendChild(pinBtn);
        btnCont.appendChild(editBtn);
        btnCont.appendChild(deleteBtn);

        titleIconCont.appendChild(pNoteTitle);
        titleIconCont.appendChild(btnCont);

        let pDesc = document.createElement("p");
        pDesc.innerText = note.noteDescription;

        let timeDate = document.createElement("div");
        timeDate.className = "timeDateCont";

        let pTime = document.createElement("p");
        pTime.innerText = note.noteTime;

        let pDate = document.createElement("p");
        pDate.innerText = note.noteDate;

        timeDate.appendChild(pTime);
        timeDate.appendChild(pDate);

        noteDiv.appendChild(titleIconCont);
        noteDiv.appendChild(pDesc);
        noteDiv.appendChild(timeDate);

        notesCont.appendChild(noteDiv);
    });
}

// EDIT
function editNote(id) {
    editingNote = id;
    let note = notes.find(n => n.noteID === id);
    if (note) {
        noteTitle.value = note.noteTitle;
        noteDescription.value = note.noteDescription;
    }
    notemodel.style.display = "flex";
}

// DELETE
async function deleteNote(id) {
    if (!confirm("Delete this note?")) return;
    await fetch(`http://localhost:5001/notes/${id}`, { method: "DELETE" });
    loadNotes();
}

// PIN
async function togglePin(id) {
    await fetch(`http://localhost:5001/notes/${id}/pin`, { method: "PUT" });
    loadNotes();
}

// LOAD NOTES
async function loadNotes() {
    const res = await fetch("http://localhost:5001/notes");
    const data = await res.json();

    notes = data.map(n => {
        const dateObj = n.createdAt ? new Date(n.createdAt) : new Date();

        return {
            noteID: n._id,
            noteTitle: n.title,
            noteDescription: n.content,
            noteDate: dateObj.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }),
            noteTime: dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }),
            isPinned: n.isPinned   // ✅ FINAL FIX
        };
    });

    displayNotes();
}

loadNotes();