/**
 * Piano Sampler - Simula un pianoforte realistico
 */

import * as Tone from 'tone';

export class PianoSampler {
  private piano: Tone.Sampler;
  private initialized: boolean = false;
  private loading: boolean = false;

  constructor() {
    this.piano = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    try {
      await Tone.start();
      await Tone.loaded();

      this.initialized = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.error('Errore caricamento piano:', error);
      throw new Error('Impossibile caricare il piano sampler');
    }
  }

  isReady(): boolean {
    return this.initialized;
  }

  isLoading(): boolean {
    return this.loading;
  }

  playKey(note: string, velocity: number = 0.8, duration?: Tone.Unit.Time): void {
    if (!this.initialized) {
      console.error('Piano non inizializzato');
      return;
    }

    try {
      if (duration) {
        this.piano.triggerAttackRelease(note, duration, undefined, velocity);
      } else {
        this.piano.triggerAttack(note, undefined, velocity);
      }
    } catch (error) {
      console.error('Errore riproduzione tasto:', error);
    }
  }

  releaseKey(note: string): void {
    if (!this.initialized) {
      return;
    }

    try {
      this.piano.triggerRelease(note);
    } catch (error) {
      console.error('Errore release tasto:', error);
    }
  }

  playChord(notes: string[], duration: Tone.Unit.Time = '2n', velocity: number = 0.8): void {
    if (!this.initialized) {
      return;
    }

    try {
      this.piano.triggerAttackRelease(notes, duration, undefined, velocity);
    } catch (error) {
      console.error('Errore riproduzione accordo:', error);
    }
  }

  setVolume(volumeDb: number): void {
    const clampedVolume = Math.max(-60, Math.min(0, volumeDb));
    this.piano.volume.value = clampedVolume;
  }

  stopAll(): void {
    this.piano.releaseAll();
  }

  dispose(): void {
    this.stopAll();
    this.piano.dispose();
    this.initialized = false;
    this.loading = false;
  }
}

let pianoInstance: PianoSampler | null = null;

export function getPianoEngine(): PianoSampler {
  if (!pianoInstance) {
    pianoInstance = new PianoSampler();
  }
  return pianoInstance;
}
