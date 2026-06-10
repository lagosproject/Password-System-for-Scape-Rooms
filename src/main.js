import './style.css';
import audioSynth from './audio.js';
import { t, setLanguage, getCurrentLang } from './i18n.js';

// Application State
let appState = {
  password: '',
  minutes: 15,
  attempts: 5,
  winMsg: 'ACCESS GRANTED',
  loseMsg: 'SYSTEM LOCKDOWN',
  bgImage: '',
  
  // Runtime state
  gameActive: false,
  currentTime: 0, // in seconds
  totalTime: 0,   // in seconds
  actualAttempts: 0,
  timerIntervalId: null,
  correctCount: 0,
};

// UI Selectors
const screens = {
  setup: document.getElementById('screen-setup'),
  wait: document.getElementById('screen-wait'),
  game: document.getElementById('screen-game'),
  result: document.getElementById('screen-result'),
};

const setupForm = document.getElementById('setup-form');
const bgInput = document.getElementById('setup-bg');
const fileNameDisplay = document.getElementById('file-name');
const setupErrors = document.getElementById('setup-errors');
const setupSuccess = document.getElementById('setup-success');
const dynamicBg = document.getElementById('dynamic-bg');
const customBgLayer = document.getElementById('bg-custom');
const bgThumbnailPreview = document.getElementById('bg-thumbnail-preview');
const bgThumbnailImg = document.getElementById('bg-thumbnail-img');
const btnRemoveBg = document.getElementById('btn-remove-bg');

const timerDisplay = document.getElementById('timer-display');
const attemptsDisplay = document.getElementById('attempts-display');
const inputsContainer = document.getElementById('inputs-container');
const terminalMessage = document.getElementById('terminal-message');
const gameLockSvg = document.getElementById('game-lock-svg');

const resultGraphic = document.getElementById('result-graphic');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const resultTimeTaken = document.getElementById('result-time-taken');
const btnReset = document.getElementById('btn-reset');
const audioStatusBtn = document.getElementById('audio-status');

// Page Load: Initialize configurations
window.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  setupAudioToggle();
  setupLanguageSwitcher();
  applyTranslations(); // Hydrate all data-i18n elements with the persisted language
});

// ----------------------------------------------------
// LANGUAGE SWITCHER
// ----------------------------------------------------

/**
 * Hydrate all elements with data-i18n / data-i18n-placeholder / data-i18n-title
 * using the current language. Also marks the active lang button.
 */
function applyTranslations() {
  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // Update title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
  // Sync html lang attribute
  document.documentElement.lang = getCurrentLang();
  // Highlight the active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getCurrentLang());
  });
}

function setupLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      applyTranslations();
    });
  });
  // Mark the initially active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getCurrentLang());
  });
}

// Screen management helper
function showScreen(targetScreen) {
  Object.values(screens).forEach(screen => {
    screen.classList.remove('active', 'fade-in');
  });
  targetScreen.classList.add('active', 'fade-in');
}

// ----------------------------------------------------
// 1. CONFIGURATION STATE & SETUP SCREEN
// ----------------------------------------------------

// Load config from LocalStorage
function loadConfig() {
  const stored = localStorage.getItem('escape_room_config');
  if (stored) {
    try {
      const config = JSON.parse(stored);
      document.getElementById('setup-password').value = config.password || '';
      document.getElementById('setup-minutes').value = config.minutes || '';
      document.getElementById('setup-attempts').value = config.attempts || '';
      document.getElementById('setup-win-msg').value = config.winMsg || '';
      document.getElementById('setup-lose-msg').value = config.loseMsg || '';
      if (config.bgImage) {
        appState.bgImage = config.bgImage;
        applyBackground(config.bgImage);
        fileNameDisplay.textContent = t('storedBgLoaded');
        showThumbnail(config.bgImage);
      }
    } catch (e) {
      console.error('Error loading saved config', e);
    }
  }
}

// Apply background image to the dedicated custom-bg-layer element.
// #dynamic-bg keeps its default cyberpunk grid CSS untouched — no conflicts.
function applyBackground(base64Url) {
  if (base64Url) {
    customBgLayer.style.backgroundImage = `url("${base64Url}")`;
    customBgLayer.classList.add('visible');
  } else {
    customBgLayer.style.backgroundImage = '';
    customBgLayer.classList.remove('visible');
  }
}

// Show/hide background thumbnail preview
function showThumbnail(base64Url) {
  if (base64Url) {
    bgThumbnailImg.src = base64Url;
    bgThumbnailPreview.classList.remove('hidden');
  } else {
    bgThumbnailImg.src = '';
    bgThumbnailPreview.classList.add('hidden');
  }
}

// Handle background image upload
bgInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  fileNameDisplay.textContent = file.name;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const base64String = event.target.result;
    appState.bgImage = base64String;
    applyBackground(base64String);
    showThumbnail(base64String);

    // Save image to localStorage
    try {
      const tempConfig = JSON.parse(localStorage.getItem('escape_room_config') || '{}');
      tempConfig.bgImage = base64String;
      localStorage.setItem('escape_room_config', JSON.stringify(tempConfig));
      setupSuccess.textContent = t('bgUploaded');
      setupSuccess.classList.remove('hidden');
      setTimeout(() => setupSuccess.classList.add('hidden'), 3000);
    } catch (err) {
      console.warn('Image file size too large for persistent LocalStorage. Will keep in memory for this session.', err);
      setupErrors.textContent = t('bgTooLarge');
      setupErrors.classList.remove('hidden');
      setTimeout(() => setupErrors.classList.add('hidden'), 5000);
    }
  };
  reader.readAsDataURL(file);
});

// Handle removing the background image
btnRemoveBg.addEventListener('click', (e) => {
  e.stopPropagation();
  appState.bgImage = '';
  applyBackground('');
  showThumbnail('');
  bgInput.value = '';
  fileNameDisplay.textContent = t('noFileSelected');
  
  // Clear image from localStorage
  try {
    const config = JSON.parse(localStorage.getItem('escape_room_config') || '{}');
    delete config.bgImage;
    localStorage.setItem('escape_room_config', JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to clear bgImage from LocalStorage', err);
  }
});

// Setup Form Submission
setupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const passwordVal = document.getElementById('setup-password').value.trim().toUpperCase();
  const minutesVal = parseInt(document.getElementById('setup-minutes').value);
  const attemptsVal = parseInt(document.getElementById('setup-attempts').value);
  const winMsgVal = document.getElementById('setup-win-msg').value.trim();
  const loseMsgVal = document.getElementById('setup-lose-msg').value.trim();

  // Validate
  if (!passwordVal || passwordVal.length < 1 || passwordVal.length > 8) {
    showSetupError(t('errPassword'));
    return;
  }
  if (isNaN(minutesVal) || minutesVal < 1) {
    showSetupError(t('errMinutes'));
    return;
  }
  if (isNaN(attemptsVal) || attemptsVal < 1) {
    showSetupError(t('errAttempts'));
    return;
  }
  
  // Update state
  appState.password = passwordVal;
  appState.minutes = minutesVal;
  appState.attempts = attemptsVal;
  appState.winMsg = winMsgVal || t('winMsgPlaceholder');
  appState.loseMsg = loseMsgVal || t('loseMsgPlaceholder');
  
  // Save entire config (minus bgImage which is already saved or managed separately)
  const finalConfig = {
    password: appState.password,
    minutes: appState.minutes,
    attempts: appState.attempts,
    winMsg: appState.winMsg,
    loseMsg: appState.loseMsg,
    bgImage: appState.bgImage
  };
  localStorage.setItem('escape_room_config', JSON.stringify(finalConfig));

  // Visual success feedback
  setupSuccess.textContent = t('msgConfigured');
  setupSuccess.classList.remove('hidden');
  setupErrors.classList.add('hidden');

  // Trigger web audio context generation on click
  audioSynth.init();

  setTimeout(() => {
    setupSuccess.classList.add('hidden');
    // Transition to Wait Screen
    showScreen(screens.wait);
  }, 1200);
});

function showSetupError(msg) {
  setupErrors.textContent = msg;
  setupErrors.classList.remove('hidden');
  setupSuccess.classList.add('hidden');
}

// ----------------------------------------------------
// 2. WAIT SCREEN (Global click listener)
// ----------------------------------------------------
document.addEventListener('click', (e) => {
  if (screens.wait.classList.contains('active')) {
    audioSynth.playClick();
    startGame();
  }
});

// ----------------------------------------------------
// 3. GAMEPLAY LOGIC
// ----------------------------------------------------

function startGame() {
  appState.gameActive = true;
  appState.actualAttempts = 0;
  appState.correctCount = 0;
  appState.totalTime = appState.minutes * 60;
  appState.currentTime = appState.totalTime;
  
  attemptsDisplay.textContent = appState.attempts;
  attemptsDisplay.className = 'value text-warning';
  // Reset lock visual
  gameLockSvg.setAttribute('class', 'lock-icon secured');

  // Build inputs
  buildInputFields();
  
  // Start timer
  startTimer();
  
  // Transition
  showScreen(screens.game);
  
  // Focus first input field
  const firstInput = inputsContainer.querySelector('.char-box');
  if (firstInput) {
    setTimeout(() => firstInput.focus(), 100);
  }
}

function buildInputFields() {
  inputsContainer.innerHTML = '';
  const passLength = appState.password.length;
  
  for (let i = 0; i < passLength; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('char-box');
    input.maxLength = 1;
    input.setAttribute('data-index', i);
    input.autocomplete = 'off';
    input.autocapitalize = 'characters';
    
    // Typing input handler
    input.addEventListener('input', (e) => {
      const val = e.target.value.toUpperCase();
      e.target.value = val; // Force uppercase display
      
      if (val) {
        checkCharInput(input, val, i);
      }
    });

    // Keydown backspace and navigation handler
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (!input.value) {
          // If empty, find the previous input which is NOT locked/correct
          focusPreviousUnlockedInput(i);
        } else {
          // If has value, let backspace delete the value (handled by browser)
          audioSynth.playClick();
        }
      } else if (e.key === 'ArrowLeft') {
        focusPreviousUnlockedInput(i);
      } else if (e.key === 'ArrowRight') {
        focusNextUnlockedInput(i);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Just key click sound
        audioSynth.playClick();
      }
    });
    
    inputsContainer.appendChild(input);
  }
}

function checkCharInput(inputEl, val, index) {
  const correctChar = appState.password[index];
  
  if (val === correctChar) {
    // Access step granted
    inputEl.classList.add('correct');
    inputEl.disabled = true; // Lock it
    appState.correctCount++;
    audioSynth.playSuccessKey();
    
    terminalMessage.textContent = t('keyLinked', index + 1);
    terminalMessage.className = 'text-info';

    // Verify Win
    if (appState.correctCount === appState.password.length) {
      endGame(true);
    } else {
      // Move to next input box
      focusNextUnlockedInput(index);
    }
  } else {
    // Incorrect guess
    inputEl.classList.add('shake');
    audioSynth.playError();
    inputEl.value = ''; // Clear box
    
    // Register attempt
    appState.actualAttempts++;
    const attemptsLeft = appState.attempts - appState.actualAttempts;
    attemptsDisplay.textContent = attemptsLeft;
    
    terminalMessage.textContent = t('keyError', index + 1);
    terminalMessage.className = 'text-danger';

    if (attemptsLeft <= 2) {
      attemptsDisplay.className = 'value text-danger pulse';
    }
    
    // Verify Lose (out of attempts)
    if (attemptsLeft <= 0) {
      endGame(false, t('reasonAttempts'));
    }
    
    // Remove shake class after animation completes
    setTimeout(() => {
      inputEl.classList.remove('shake');
    }, 400);
  }
}

function focusNextUnlockedInput(currentIndex) {
  const inputs = Array.from(inputsContainer.querySelectorAll('.char-box'));
  for (let i = currentIndex + 1; i < inputs.length; i++) {
    if (!inputs[i].classList.contains('correct')) {
      inputs[i].focus();
      return;
    }
  }
}

function focusPreviousUnlockedInput(currentIndex) {
  const inputs = Array.from(inputsContainer.querySelectorAll('.char-box'));
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (!inputs[i].classList.contains('correct')) {
      inputs[i].focus();
      inputs[i].value = ''; // Automatically wipe the previous character on backspace move
      return;
    }
  }
}

// ----------------------------------------------------
// 4. TIMER COUNTDOWN
// ----------------------------------------------------

function startTimer() {
  updateTimerDisplay();
  
  if (appState.timerIntervalId) {
    clearInterval(appState.timerIntervalId);
  }
  
  appState.timerIntervalId = setInterval(() => {
    if (!appState.gameActive) return;
    
    appState.currentTime--;
    updateTimerDisplay();
    
    // Warning effects under 60 seconds
    if (appState.currentTime <= 60 && appState.currentTime > 0) {
      timerDisplay.classList.add('warning');
      audioSynth.playWarningBeep();
    }
    
    // Out of time
    if (appState.currentTime <= 0) {
      clearInterval(appState.timerIntervalId);
      endGame(false, t('reasonTime'));
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(appState.currentTime / 60);
  const seconds = appState.currentTime % 60;
  
  const paddedMins = String(minutes).padStart(2, '0');
  const paddedSecs = String(seconds).padStart(2, '0');
  
  timerDisplay.textContent = `${paddedMins}:${paddedSecs}`;
}

// ----------------------------------------------------
// 5. GAME OVER / RESULT STATES
// ----------------------------------------------------

function endGame(isWon, reason = '') {
  appState.gameActive = false;
  clearInterval(appState.timerIntervalId);
  
  // Block any further inputs in game view
  Array.from(inputsContainer.querySelectorAll('.char-box')).forEach(inp => {
    inp.disabled = true;
  });

  // Calculate stats
  const timeUsed = appState.totalTime - appState.currentTime;
  const minsUsed = Math.floor(timeUsed / 60);
  const secsUsed = timeUsed % 60;
  const timeTakenStr = t('timeTaken', minsUsed, secsUsed);

  // Render Result overlay
  if (isWon) {
    resultBoxWin(timeTakenStr);
  } else {
    resultBoxLose(reason);
  }
  
  // Transition to result screen after a small delay (1s) to let players see the final character box state
  setTimeout(() => {
    showScreen(screens.result);
  }, 1200);
}

function resultBoxWin(timeStr) {
  screens.result.querySelector('.result-box').className = 'result-box won glassmorphism';
  
  // Locked opened icon SVG
  resultGraphic.innerHTML = `
    <svg class="lock-icon unlocked" viewBox="0 0 24 24" width="120" height="120">
      <path class="lock-shackle" d="M12 2A5 5 0 0 0 7 7v4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v4H9z" />
    </svg>
  `;
  
  resultTitle.textContent = t('winTitle');
  resultMessage.textContent = appState.winMsg;
  resultTimeTaken.textContent = timeStr;
  
  audioSynth.playWin();
}

function resultBoxLose(reason) {
  screens.result.querySelector('.result-box').className = 'result-box lost glassmorphism';
  
  // Failed/Lockdown icon SVG
  resultGraphic.innerHTML = `
    <svg class="lock-icon failed" viewBox="0 0 24 24" width="120" height="120">
      <path class="lock-shackle" d="M12 2A5 5 0 0 0 7 7v4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v4H9z" />
    </svg>
  `;
  
  resultTitle.textContent = t('loseTitle', reason);
  resultMessage.textContent = appState.loseMsg;
  resultTimeTaken.textContent = t('lockdownMsg');
  
  audioSynth.playLose();
}

// Reset System back to Setup screen
btnReset.addEventListener('click', () => {
  audioSynth.playClick();
  
  // Reset fields to setup
  timerDisplay.classList.remove('warning');
  timerDisplay.textContent = '00:00';
  terminalMessage.textContent = t('terminalReady');
  terminalMessage.className = 'text-info';
  
  showScreen(screens.setup);
});

// ----------------------------------------------------
// 6. AUDIO CONTROLS
// ----------------------------------------------------

function setupAudioToggle() {
  updateAudioIcon();
  
  audioStatusBtn.addEventListener('click', () => {
    const isMuted = audioSynth.toggleMute();
    updateAudioIcon();
    
    // Play test click if unmuted
    if (!isMuted) {
      audioSynth.playClick();
    }
  });
}

function updateAudioIcon() {
  const muted = audioSynth.isMuted();
  if (muted) {
    audioStatusBtn.classList.add('muted');
    audioStatusBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="#64748b" />
      </svg>
    `;
  } else {
    audioStatusBtn.classList.remove('muted');
    audioStatusBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="#00f0ff" />
      </svg>
    `;
  }
}
