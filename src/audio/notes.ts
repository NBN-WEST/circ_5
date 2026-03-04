/**
 * Definizioni note musicali e utility
 */

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type NoteName = typeof NOTE_NAMES[number];

export const NOTE_NAMES_IT = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'] as const;

export const NOTE_IT_MAP: Record<string, string> = {
  'C': 'Do', 'C#': 'Do#', 'Db': 'Reb',
  'D': 'Re', 'D#': 'Re#', 'Eb': 'Mib',
  'E': 'Mi',
  'F': 'Fa', 'F#': 'Fa#', 'Gb': 'Solb',
  'G': 'Sol', 'G#': 'Sol#', 'Ab': 'Lab',
  'A': 'La', 'A#': 'La#', 'Bb': 'Sib',
  'B': 'Si'
};

export const NOTE_NUMBERS: Record<string, number> = {
  'C': 0, 'C#': 1, 'Db': 1,
  'D': 2, 'D#': 3, 'Eb': 3,
  'E': 4,
  'F': 5, 'F#': 6, 'Gb': 6,
  'G': 7, 'G#': 8, 'Ab': 8,
  'A': 9, 'A#': 10, 'Bb': 10,
  'B': 11
};

export const NUMBER_TO_NOTE: string[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

/**
 * Converte nota + ottava in frequenza (Hz)
 */
export function noteToFrequency(note: string, octave: number): number {
  const noteNum = NOTE_NUMBERS[note];
  if (noteNum === undefined) {
    throw new Error(`Nota non valida: ${note}`);
  }

  const midiNote = (octave + 1) * 12 + noteNum;
  const a4Midi = 69;
  const semitonesDiff = midiNote - a4Midi;

  return 440 * Math.pow(2, semitonesDiff / 12);
}

/**
 * Converte nota inglese in italiana
 */
export function toItalianNote(note: string): string {
  return NOTE_IT_MAP[note] || note;
}

/**
 * Valida se una nota è valida
 */
export function isValidNote(note: string): boolean {
  return note in NOTE_NUMBERS;
}

/**
 * Ottiene la nota trasposta di N semitoni
 */
export function transposeNote(note: string, semitones: number): string {
  const noteNum = NOTE_NUMBERS[note];
  if (noteNum === undefined) {
    throw new Error(`Nota non valida: ${note}`);
  }

  const newNoteNum = (noteNum + semitones + 12) % 12;
  return NUMBER_TO_NOTE[newNoteNum];
}
