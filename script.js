const
    piano = document.querySelector('.piano'),
    pianoKay = document.querySelectorAll('.piano-key'),
    pianoKayArr = [],
    buttonFullscreen = document.querySelector('.fullscreen'),
    buttonContainer = document.querySelector('.btn-container'),
    buttonNotes = document.querySelector('.btn-notes'),
    buttonLetters = document.querySelector('.btn-letters');

buttonFullscreen.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('fullscreen')) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
});

buttonContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-notes')) {
        buttonLetters.classList.remove('btn-active');
        buttonNotes.classList.add('btn-active');
        pianoKay.forEach(item => {
            item.classList.remove('piano-key-letter');
        });
    } else {
        buttonNotes.classList.remove('btn-active');
        buttonLetters.classList.add('btn-active');
        pianoKay.forEach(item => {
            item.classList.add('piano-key-letter');
        });
    }
});

for (let i = 0; i < pianoKay.length; i++) {
    pianoKayArr[i] = pianoKay[i];
    pianoKay[i].classList.add('piano-key-remove-mouse');
}

function singAudioFromPath(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

function singAudioFromNote(note) {
    singAudioFromPath(`assets/audio/${note}.mp3`);
}

function dinamycNoteDown(note) {
    let index = pianoKayArr.findIndex(item => item.dataset.note == note);
    if (index != -1) {
        pianoKay[index].classList.add('piano-key-active', 'piano-key-active-pseudo');
    }
}

function dinamycNoteUp(note) {
    let index = pianoKayArr.findIndex(item => item.dataset.note == note);
    if (index != -1) {
        pianoKay[index].classList.remove('piano-key-active', 'piano-key-active-pseudo');
    }
}

function playPiano(note) {
    singAudioFromNote(note);
    dinamycNoteDown(note);
}

let isDown = false;
piano.addEventListener('mousedown', () => {
    isDown = true;
});

piano.addEventListener('mouseover', (e) => {
    if (e.target && e.target.classList.contains('piano-key')) {
        const note = e.target.dataset.note;
        if (isDown) {
            playPiano(note);
        }
    }
});
piano.addEventListener('mouseout', (e) => {
    if (e.target && e.target.classList.contains('piano-key')) {
        const note = e.target.dataset.note;
        dinamycNoteUp(note);
    }
});

piano.addEventListener('mousedown', (e) => {
    if (e.target && e.target.classList.contains('piano-key')) {
        const note = e.target.dataset.note;
        playPiano(note);
    }
});

piano.addEventListener('mouseup', (e) => {
    if (e.target && e.target.classList.contains('piano-key') && e.offsetX > 0 && e.offsetY > 0 && e.offsetY < 260) {
        const note = e.target.dataset.note;
        dinamycNoteUp(note);
        isDown = false;
    }
});

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let index = pianoKayArr.findIndex(item => `Key${item.dataset.letter}` == e.code);
    const note = pianoKay[index].dataset.note;
    playPiano(note);
});

window.addEventListener('keyup', (e) => {
    let index = pianoKayArr.findIndex(item => `Key${item.dataset.letter}` == e.code);
    const note = pianoKay[index].dataset.note;
    dinamycNoteUp(note);
});


