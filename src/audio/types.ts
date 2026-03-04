/**
 * TypeScript types per il sistema audio
 */

export type OctaveNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface NoteInfo {
  note: string;
  octave: OctaveNumber;
  frequency: number;
  fullNote: string;
}

export interface AudioEngineConfig {
  volume: number;
  reverb: number;
  delay: number;
}

export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface SynthesizerOptions {
  waveform: WaveformType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}
