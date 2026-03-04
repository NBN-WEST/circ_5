/**
 * Funzioni di validazione input
 */

export function isValidNote(note: string): boolean {
  const validNotes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
  const noteName = note.replace(/\d+/, '');
  return validNotes.includes(noteName);
}

export function isValidOctave(octave: number): boolean {
  return octave >= 0 && octave <= 8;
}

export function validateNoteString(noteString: string): boolean {
  const pattern = /^[A-G](#|b)?[0-8]$/;
  return pattern.test(noteString);
}

export function sanitizeUserInput(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .replace(/[<>'"\\]/g, '')
    .slice(0, maxLength);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
