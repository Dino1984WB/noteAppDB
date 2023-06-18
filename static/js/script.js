const noteTextarea = document.getElementById('note-textarea');
const saveBtn = document.getElementById('save-btn');
const deleteBtn = document.getElementById('delete-btn');
const noteList = document.getElementById('notes');

let selectedNoteId = null;

function createNoteItem(note) {
  const li = document.createElement('li');
  li.classList.add('note-item');
  li.textContent = note.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    deleteNoteFromBackend(note.id);
  });

  li.appendChild(deleteBtn);

  li.addEventListener('click', () => {
    selectedNoteId = note.id;
    noteTextarea.value = note.text;
  });

  noteList.appendChild(li);
}

function clearNoteList() {
  noteList.innerHTML = '';
}

function fetchNotes() {
  fetch('/notes')
    .then(response => response.json())
    .then(notes => {
      clearNoteList();
      notes.forEach(note => createNoteItem(note));
    })
    .catch(error => console.log(error));
}

function saveNote() {
  const noteText = noteTextarea.value.trim();
  if (noteText === '') {
    return;
  }

  const note = {
    id: Date.now(),
    text: noteText
  };

  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
    .then(response => response.json())
    .then(() => {
      fetchNotes();
      noteTextarea.value = '';
    })
    .catch(error => console.log(error));
}

function deleteNoteFromBackend(noteId) {
  fetch(`/notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(() => {
      fetchNotes();
      noteTextarea.value = '';
      selectedNoteId = null;
    })
    .catch(error => console.log(error));
}

saveBtn.addEventListener('click', saveNote);
deleteBtn.addEventListener('click', () => {
  if (!selectedNoteId) {
    return;
  }
  deleteNoteFromBackend(selectedNoteId);
});

fetchNotes();
