// Cyberpunk Audio Synthesizer using Web Audio API

class CyberAudioSynth {
  constructor() {
    this.ctx = null;
    this.muted = false;
    
    // Check if muted state is stored in localStorage
    const savedMute = localStorage.getItem('sfx_muted');
    if (savedMute !== null) {
      this.muted = savedMute === 'true';
    }
  }

  // Safe lazy initializer for AudioContext
  init() {
    try {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        } else {
          console.warn('Web Audio API not supported in this browser environment.');
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(err => console.warn('Failed to resume AudioContext:', err));
      }
    } catch (e) {
      console.error('Failed to initialize AudioContext safely:', e);
      this.ctx = null;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('sfx_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Standard high-tech keypress click
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('Failed to play click sound:', e);
    }
  }

  // Key match sound (Access part-way granted)
  playSuccessKey() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      // Simple 2-note quick arpeggio
      this.playTone(600, 'sine', 0.06, 0.08, now);
      this.playTone(850, 'sine', 0.06, 0.12, now + 0.05);
    } catch (e) {
      console.warn('Failed to play success key sound:', e);
    }
  }

  // Incorrect entry buzzer
  playError() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.25);
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.28);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Failed to play error buzzer:', e);
    }
  }

  // Periodic alert sound for low-time warning
  playWarningBeep() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(988, this.ctx.currentTime); // B5 note
      
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {
      console.warn('Failed to play warning beep:', e);
    }
  }

  // Access Granted - Victory theme
  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
      notes.forEach((freq, index) => {
        this.playTone(freq, 'triangle', 0.25, 0.1, now + index * 0.08);
      });
    } catch (e) {
      console.warn('Failed to play win sound:', e);
    }
  }

  // Access Denied / Lockdown - Defeat theme
  playLose() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 1.2);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(150, now + 1.2);
      
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 1.3);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(now + 1.4);
    } catch (e) {
      console.warn('Failed to play lose sound:', e);
    }
  }

  // Helper method to play a single tone
  playTone(frequency, type, duration, volume, startTime) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, startTime);
      
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.02);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn('Failed to play tone:', e);
    }
  }
}

export const audioSynth = new CyberAudioSynth();
export default audioSynth;
