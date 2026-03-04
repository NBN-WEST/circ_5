/**
 * Sistema di generazione accordi musicali
 */

import { NOTE_NUMBERS, NUMBER_TO_NOTE, isValidNote } from './notes';

export interface ChordDefinition {
  name: string;
  nameIT: string;
  intervals: number[];
  symbol?: string;
}

export const CHORD_TYPES: Record<string, ChordDefinition> = {
  major: {
    name: 'Major',
    nameIT: 'Maggiore',
    intervals: [0, 4, 7],
    symbol: ''
  },
  minor: {
    name: 'Minor',
    nameIT: 'Minore',
    intervals: [0, 3, 7],
    symbol: 'm'
  },
  diminished: {
    name: 'Diminished',
    nameIT: 'Diminuito',
    intervals: [0, 3, 6],
    symbol: 'dim'
  },
  augmented: {
    name: 'Augmented',
    nameIT: 'Aumentato',
    intervals: [0, 4, 8],
    symbol: 'aug'
  },
  major7: {
    name: 'Major 7th',
    nameIT: 'Settima Maggiore',
    intervals: [0, 4, 7, 11],
    symbol: 'maj7'
  },
  minor7: {
    name: 'Minor 7th',
    nameIT: 'Settima Minore',
    intervals: [0, 3, 7, 10],
    symbol: 'm7'
  },
  dominant7: {
    name: 'Dominant 7th',
    nameIT: 'Settima di Dominante',
    intervals: [0, 4, 7, 10],
    symbol: '7'
  },
  sus2: {
    name: 'Suspended 2nd',
    nameIT: 'Sospeso Seconda',
    intervals: [0, 2, 7],
    symbol: 'sus2'
  },
  sus4: {
    name: 'Suspended 4th',
    nameIT: 'Sospeso Quarta',
    intervals: [0, 5, 7],
    symbol: 'sus4'
  }
};

export function generateChord(
  rootNote: string,
  chordType: keyof typeof CHORD_TYPES,
  octave: number = 4
): string[] {
  if (!isValidNote(rootNote)) {
    throw new Error(`Nota radice non valida: ${rootNote}`);
  }

  if (!CHORD_TYPES[chordType]) {
    throw new Error(`Tipo di accordo non valido: ${chordType}`);
  }

  const chord = CHORD_TYPES[chordType];
  const rootNumber = NOTE_NUMBERS[rootNote];

  return chord.intervals.map(interval => {
    const noteNumber = (rootNumber + interval) % 12;
    const octaveAdjust = Math.floor((rootNumber + interval) / 12);
    const finalOctave = octave + octaveAdjust;

    return `${NUMBER_TO_NOTE[noteNumber]}${finalOctave}`;
  });
}

export function getChordName(
  rootNote: string,
  chordType: keyof typeof CHORD_TYPES,
  italian: boolean = true
): string {
  if (!CHORD_TYPES[chordType]) {
    throw new Error(`Tipo di accordo non valido: ${chordType}`);
  }

  const chord = CHORD_TYPES[chordType];
  const chordName = italian ? chord.nameIT : chord.name;

  return `${rootNote} ${chordName}`;
}

export function getChordSymbol(
  rootNote: string,
  chordType: keyof typeof CHORD_TYPES
): string {
  if (!CHORD_TYPES[chordType]) {
    throw new Error(`Tipo di accordo non valido: ${chordType}`);
  }

  const chord = CHORD_TYPES[chordType];
  return `${rootNote}${chord.symbol || ''}`;
}
