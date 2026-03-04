/**
 * Definizioni complete delle tonalita' del circolo delle quinte
 */

export interface MusicalKey {
  name: string;
  major: string;
  minor: string;
  majorEN: string;
  minorEN: string;
  sharps: number;
  flats: number;
  angle: number;
  majorScale: string[];
  minorScale: string[];
  alterations: string[];
  position: number;
  color: string;
}

export const CIRCLE_OF_FIFTHS_KEYS: MusicalKey[] = [
  {
    name: 'C',
    major: 'Do Maggiore',
    minor: 'La minore',
    majorEN: 'C Major',
    minorEN: 'A minor',
    sharps: 0,
    flats: 0,
    angle: 90,
    majorScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    minorScale: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    alterations: [],
    position: 0,
    color: '#ffffff'
  },
  {
    name: 'G',
    major: 'Sol Maggiore',
    minor: 'Mi minore',
    majorEN: 'G Major',
    minorEN: 'E minor',
    sharps: 1,
    flats: 0,
    angle: 60,
    majorScale: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    minorScale: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    alterations: ['F#'],
    position: 1,
    color: '#60a5fa'
  },
  {
    name: 'D',
    major: 'Re Maggiore',
    minor: 'Si minore',
    majorEN: 'D Major',
    minorEN: 'B minor',
    sharps: 2,
    flats: 0,
    angle: 30,
    majorScale: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    minorScale: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    alterations: ['F#', 'C#'],
    position: 2,
    color: '#3b82f6'
  },
  {
    name: 'A',
    major: 'La Maggiore',
    minor: 'Fa# minore',
    majorEN: 'A Major',
    minorEN: 'F# minor',
    sharps: 3,
    flats: 0,
    angle: 0,
    majorScale: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    minorScale: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    alterations: ['F#', 'C#', 'G#'],
    position: 3,
    color: '#2563eb'
  },
  {
    name: 'E',
    major: 'Mi Maggiore',
    minor: 'Do# minore',
    majorEN: 'E Major',
    minorEN: 'C# minor',
    sharps: 4,
    flats: 0,
    angle: -30,
    majorScale: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    minorScale: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    alterations: ['F#', 'C#', 'G#', 'D#'],
    position: 4,
    color: '#1d4ed8'
  },
  {
    name: 'B',
    major: 'Si Maggiore',
    minor: 'Sol# minore',
    majorEN: 'B Major',
    minorEN: 'G# minor',
    sharps: 5,
    flats: 0,
    angle: -60,
    majorScale: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    minorScale: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
    alterations: ['F#', 'C#', 'G#', 'D#', 'A#'],
    position: 5,
    color: '#1e40af'
  },
  {
    name: 'F#/Gb',
    major: 'Fa#/Solb Maggiore',
    minor: 'Re#/Mib minore',
    majorEN: 'F#/Gb Major',
    minorEN: 'D#/Eb minor',
    sharps: 6,
    flats: 6,
    angle: -90,
    majorScale: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    minorScale: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
    alterations: ['F#', 'C#', 'G#', 'D#', 'A#', 'E#'],
    position: 6,
    color: '#1e3a8a'
  },
  {
    name: 'Db',
    major: 'Reb Maggiore',
    minor: 'Sib minore',
    majorEN: 'Db Major',
    minorEN: 'Bb minor',
    sharps: 0,
    flats: 5,
    angle: -120,
    majorScale: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    minorScale: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'],
    alterations: ['Bb', 'Eb', 'Ab', 'Db', 'Gb'],
    position: 7,
    color: '#7c3aed'
  },
  {
    name: 'Ab',
    major: 'Lab Maggiore',
    minor: 'Fa minore',
    majorEN: 'Ab Major',
    minorEN: 'F minor',
    sharps: 0,
    flats: 4,
    angle: -150,
    majorScale: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
    minorScale: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
    alterations: ['Bb', 'Eb', 'Ab', 'Db'],
    position: 8,
    color: '#6d28d9'
  },
  {
    name: 'Eb',
    major: 'Mib Maggiore',
    minor: 'Do minore',
    majorEN: 'Eb Major',
    minorEN: 'C minor',
    sharps: 0,
    flats: 3,
    angle: 180,
    majorScale: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
    minorScale: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    alterations: ['Bb', 'Eb', 'Ab'],
    position: 9,
    color: '#5b21b6'
  },
  {
    name: 'Bb',
    major: 'Sib Maggiore',
    minor: 'Sol minore',
    majorEN: 'Bb Major',
    minorEN: 'G minor',
    sharps: 0,
    flats: 2,
    angle: 150,
    majorScale: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
    minorScale: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    alterations: ['Bb', 'Eb'],
    position: 10,
    color: '#4c1d95'
  },
  {
    name: 'F',
    major: 'Fa Maggiore',
    minor: 'Re minore',
    majorEN: 'F Major',
    minorEN: 'D minor',
    sharps: 0,
    flats: 1,
    angle: 120,
    majorScale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    minorScale: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    alterations: ['Bb'],
    position: 11,
    color: '#a855f7'
  }
];

export function getKeyByName(name: string): MusicalKey | undefined {
  return CIRCLE_OF_FIFTHS_KEYS.find(key => key.name === name);
}

export function getKeyByPosition(position: number): MusicalKey | undefined {
  return CIRCLE_OF_FIFTHS_KEYS.find(key => key.position === position);
}

export function getNextKey(currentKey: MusicalKey): MusicalKey {
  const nextPosition = (currentKey.position + 1) % 12;
  return getKeyByPosition(nextPosition)!;
}

export function getPreviousKey(currentKey: MusicalKey): MusicalKey {
  const prevPosition = (currentKey.position - 1 + 12) % 12;
  return getKeyByPosition(prevPosition)!;
}

export function getAlterationsDescription(key: MusicalKey): string {
  if (key.sharps === 0 && key.flats === 0) {
    return 'Nessuna alterazione in chiave';
  }

  if (key.sharps > 0) {
    return `${key.sharps} diesis (#): ${key.alterations.join(', ')}`;
  }

  return `${key.flats} bemolle (b): ${key.alterations.join(', ')}`;
}
