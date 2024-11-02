const { ipcRenderer } = require('electron');

let currentNote = null;
let notes = [];

// Load notes when the app starts
loadNotes();

async function loadNotes() {
    notes = await ipcRenderer.invoke('load-notes');
    displayNotes();
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
}

function getPreviewText(content) {
    return content ? content.substring(0, 50) + (content.length > 50 ? '...' : '') : 'No content';
}

function displayNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    
    if (notes.length === 0) {
        noteList.innerHTML = '<div class="empty-state">No notes yet. Create your first note!</div>';
        return;
    }

    // Sort notes by timestamp, most recent first
    notes.sort((a, b) => b.timestamp - a.timestamp);
    
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note-item';
        if (currentNote && currentNote.id === note.id) {
            noteElement.className += ' selected';
        }

        const titleElement = document.createElement('div');
        titleElement.className = 'note-title';
        titleElement.textContent = note.title;

        const previewElement = document.createElement('div');
        previewElement.className = 'note-preview';
        previewElement.textContent = getPreviewText(note.content);

        const timestampElement = document.createElement('div');
        timestampElement.className = 'timestamp';
        timestampElement.textContent = formatTimestamp(note.timestamp);

        noteElement.appendChild(titleElement);
        noteElement.appendChild(previewElement);
        noteElement.appendChild(timestampElement);
        
        noteElement.onclick = () => selectNote(note);
        noteList.appendChild(noteElement);
    });
}

function selectNote(note) {
    currentNote = note;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content || '';
    hideAllErrors();
    displayNotes();
}

function createNewNote() {
    currentNote = null;
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    hideAllErrors();
    displayNotes();
}

function showError(fieldId, errorId) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    inputElement.classList.add('input-error');
    errorElement.style.display = 'block';
}

function hideError(fieldId, errorId) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    inputElement.classList.remove('input-error');
    errorElement.style.display = 'none';
}

function hideAllErrors() {
    hideError('noteTitle', 'titleError');
    hideError('noteContent', 'contentError');
}

function validateNote(title, content) {
    let isValid = true;
    
    if (!title.trim()) {
        showError('noteTitle', 'titleError');
        isValid = false;
    }
    
    if (!content.trim()) {
        showError('noteContent', 'contentError');
        isValid = false;
    }
    
    return isValid;
}

async function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();

    if (!validateNote(title, content)) {
        return;
    }

    const note = {
        id: currentNote ? currentNote.id : null,
        title: title,
        content: content,
        timestamp: Date.now()
    };

    notes = await ipcRenderer.invoke('save-note', note);
    currentNote = note;
    hideAllErrors();
    displayNotes();
}

// Event listeners for input fields to hide errors when typing
document.getElementById('noteTitle').addEventListener('input', () => {
    hideError('noteTitle', 'titleError');
});

document.getElementById('noteContent').addEventListener('input', () => {
    hideError('noteContent', 'contentError');
});