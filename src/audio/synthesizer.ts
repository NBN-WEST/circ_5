/**
 * Audio Synthesizer principale usando Tone.js
 */

import * as Tone from 'tone';

export class AudioSynthesizer {
  private synth: Tone.PolySynth;
  private reverb: Tone.Reverb;
  private initialized: boolean = false;
  private currentVolume: number = -10;

  constructor() {
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    });

    this.reverb = new Tone.Reverb({
      decay: 1.5,
      wet: 0.3
    });

    this.synth.connect(this.reverb);
    this.reverb.toDestination();
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await Tone.start();
      this.initialized = true;
    } catch (error) {
      console.error('Errore inizializzazione audio:', error);
      throw new Error('Impossibile inizializzare il motore audio');
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  playNote(note: string, duration: string | number = '8n', velocity: number = 0.8): void {
    if (!this.initialized) {
      console.error('Audio non inizializzato. Chiama initialize() prima.');
      return;
    }

    try {
      this.synth.triggerAttackRelease(note, duration, undefined, velocity);
    } catch (error) {
      console.error('Errore riproduzione nota:', error);
    }
  }

  playChord(notes: string[], duration: string | number = '2n', velocity: number = 0.8): void {
    if (!this.initialized) {
      console.error('Audio non inizializzato');
      return;
    }

    if (notes.length === 0) {
      return;
    }

    try {
      this.synth.triggerAttackRelease(notes, duration, undefined, velocity);
    } catch (error) {
      console.error('Errore riproduzione accordo:', error);
    }
  }

  setVolume(volumeDb: number): void {
    const clampedVolume = Math.max(-60, Math.min(0, volumeDb));
    this.currentVolume = clampedVolume;
    this.synth.volume.value = clampedVolume;
  }

  getVolume(): number {
    return this.currentVolume;
  }

  setReverb(amount: number): void {
    const clampedAmount = Math.max(0, Math.min(1, amount));
    this.reverb.wet.value = clampedAmount;
  }

  setWaveform(waveform: 'sine' | 'square' | 'sawtooth' | 'triangle'): void {
    this.synth.set({ oscillator: { type: waveform } });
  }

  setEnvelope(attack: number, decay: number, sustain: number, release: number): void {
    this.synth.set({ envelope: { attack, decay, sustain, release } });
  }

  stopAll(): void {
    this.synth.releaseAll();
  }

  dispose(): void {
    this.stopAll();
    this.synth.dispose();
    this.reverb.dispose();
    this.initialized = false;
  }

  getAudioContextState(): AudioContextState {
    return Tone.getContext().state;
  }
}

let audioEngineInstance: AudioSynthesizer | null = null;

export function getAudioEngine(): AudioSynthesizer {
  if (!audioEngineInstance) {
    audioEngineInstance = new AudioSynthesizer();
  }
  return audioEngineInstance;
}
