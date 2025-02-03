// src/renderer.js
let timeLeft;
let timerId = null;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    // Update the window title to show current time
    document.title = `${timerDisplay.textContent} - Pomodoro Timer`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startBtn.textContent = 'Pause';
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                startBtn.textContent = 'Start';
                
                // Show notification when timer ends
                new Notification('Pomodoro Timer', {
                    body: 'Time is up!',
                    icon: './icons/icon.ico' // If you have an icon
                });

                // Play notification sound (optional)
                try {
                    const audio = new Audio();
                    audio.play().catch(e => console.log('Audio play failed:', e));
                } catch (e) {
                    console.log('Audio creation failed:', e);
                }
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        isRunning = false;
        startBtn.textContent = 'Start';
    }
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    const activeButton = document.querySelector('.mode-btn.active');
    timeLeft = parseInt(activeButton.dataset.time) * 60;
    updateTimer();
}

function setMode(event) {
    const button = event.target;
    if (!button.classList.contains('mode-btn')) return;

    // Update active button
    modeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Reset timer for new mode
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    timeLeft = parseInt(button.dataset.time) * 60;
    updateTimer();
}

// Request notification permission on start
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Initialize timer
timeLeft = 25 * 60; // 25 minutes by default
updateTimer();

// Event listeners
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
document.querySelector('.mode-buttons').addEventListener('click', setMode);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent space from scrolling
        startTimer();
    } else if (e.code === 'KeyR') {
        resetTimer();
    }
});

// Handle window focus
window.addEventListener('focus', () => {
    // Update timer display when window regains focus
    updateTimer();
});
