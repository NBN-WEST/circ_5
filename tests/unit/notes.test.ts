import { describe, it, expect } from 'vitest';
import { noteToFrequency, toItalianNote, isValidNote, transposeNote } from '../../src/audio/notes';

describe('Notes Utilities', () => {
  it('should calculate A4 frequency as 440Hz', () => {
    const freq = noteToFrequency('A', 4);
    expect(freq).toBeCloseTo(440, 1);
  });

  it('should calculate C4 frequency correctly', () => {
    const freq = noteToFrequency('C', 4);
    expect(freq).toBeCloseTo(261.63, 1);
  });

  it('should convert notes to Italian', () => {
    expect(toItalianNote('C')).toBe('Do');
    expect(toItalianNote('G')).toBe('Sol');
    expect(toItalianNote('A')).toBe('La');
  });

  it('should validate notes', () => {
    expect(isValidNote('C')).toBe(true);
    expect(isValidNote('F#')).toBe(true);
    expect(isValidNote('Z')).toBe(false);
  });

  it('should transpose notes correctly', () => {
    expect(transposeNote('C', 7)).toBe('G');
    expect(transposeNote('G', 5)).toBe('C');
  });

  it('should throw for invalid notes', () => {
    expect(() => noteToFrequency('Z', 4)).toThrow();
  });
});
