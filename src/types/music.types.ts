export interface NoteDefinition {
  name: string;
  nameIT: string;
  frequency: number;
  midi: number;
}

export type ChordQuality = 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7' | 'sus2' | 'sus4';

export interface ScaleInfo {
  root: string;
  type: string;
  notes: string[];
  intervals: number[];
}
