import { describe, it, expect } from 'vitest';
import { generateChord, getChordName, CHORD_TYPES } from '../../src/audio/chords';

describe('Chord Generation', () => {
  it('should generate correct major chord', () => {
    const chord = generateChord('C', 'major', 4);
    expect(chord).toEqual(['C4', 'E4', 'G4']);
  });

  it('should generate correct minor chord', () => {
    const chord = generateChord('A', 'minor', 4);
    expect(chord).toEqual(['A4', 'C5', 'E5']);
  });

  it('should handle octave transitions', () => {
    const chord = generateChord('A', 'major', 4);
    expect(chord).toContain('C#5');
  });

  it('should generate chord names correctly', () => {
    expect(getChordName('C', 'major')).toBe('C Maggiore');
    expect(getChordName('D', 'minor')).toBe('D Minore');
  });

  it('should throw error for invalid note', () => {
    expect(() => generateChord('Z', 'major', 4)).toThrow();
  });

  it('should support all chord types', () => {
    for (const chordType of Object.keys(CHORD_TYPES)) {
      expect(() => generateChord('C', chordType, 4)).not.toThrow();
    }
  });
});
