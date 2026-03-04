/**
 * Definizioni scale musicali
 */

export interface ScaleDefinition {
  name: string;
  nameIT: string;
  intervals: number[];
  pattern: string;
}

export const SCALES: Record<string, ScaleDefinition> = {
  major: {
    name: 'Major',
    nameIT: 'Maggiore',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    pattern: 'T-T-S-T-T-T-S'
  },
  naturalMinor: {
    name: 'Natural Minor',
    nameIT: 'Minore Naturale',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    pattern: 'T-S-T-T-S-T-T'
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    nameIT: 'Minore Armonica',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    pattern: 'T-S-T-T-S-T+S-S'
  },
  melodicMinor: {
    name: 'Melodic Minor',
    nameIT: 'Minore Melodica',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    pattern: 'T-S-T-T-T-T-S'
  },
  dorian: {
    name: 'Dorian',
    nameIT: 'Dorico',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    pattern: 'T-S-T-T-T-S-T'
  },
  phrygian: {
    name: 'Phrygian',
    nameIT: 'Frigio',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    pattern: 'S-T-T-T-S-T-T'
  },
  lydian: {
    name: 'Lydian',
    nameIT: 'Lidio',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    pattern: 'T-T-T-S-T-T-S'
  },
  mixolydian: {
    name: 'Mixolydian',
    nameIT: 'Misolidio',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    pattern: 'T-T-S-T-T-S-T'
  },
  pentatonicMajor: {
    name: 'Pentatonic Major',
    nameIT: 'Pentatonica Maggiore',
    intervals: [0, 2, 4, 7, 9],
    pattern: 'T-T-T+S-T-T+S'
  },
  pentatonicMinor: {
    name: 'Pentatonic Minor',
    nameIT: 'Pentatonica Minore',
    intervals: [0, 3, 5, 7, 10],
    pattern: 'T+S-T-T-T+S-T'
  }
};

export const SCALE_DEGREES = [
  { number: 'I', name: 'Tonica', nameEN: 'Tonic' },
  { number: 'II', name: 'Sopratonica', nameEN: 'Supertonic' },
  { number: 'III', name: 'Mediante', nameEN: 'Mediant' },
  { number: 'IV', name: 'Sottodominante', nameEN: 'Subdominant' },
  { number: 'V', name: 'Dominante', nameEN: 'Dominant' },
  { number: 'VI', name: 'Sopradominante', nameEN: 'Submediant' },
  { number: 'VII', name: 'Sensibile', nameEN: 'Leading Tone' }
];
