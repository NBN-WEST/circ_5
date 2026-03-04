import { describe, it, expect } from 'vitest';
import { isValidNote, isValidOctave, validateNoteString, sanitizeUserInput } from '../../src/utils/validation';

describe('Validation Utilities', () => {
  it('should validate correct notes', () => {
    expect(isValidNote('C4')).toBe(true);
    expect(isValidNote('F#3')).toBe(true);
    expect(isValidNote('Bb2')).toBe(true);
  });

  it('should validate octave range', () => {
    expect(isValidOctave(0)).toBe(true);
    expect(isValidOctave(8)).toBe(true);
    expect(isValidOctave(-1)).toBe(false);
    expect(isValidOctave(9)).toBe(false);
  });

  it('should validate note strings', () => {
    expect(validateNoteString('C4')).toBe(true);
    expect(validateNoteString('F#3')).toBe(true);
    expect(validateNoteString('XX')).toBe(false);
  });

  it('should sanitize user input', () => {
    expect(sanitizeUserInput('  hello  ')).toBe('hello');
    expect(sanitizeUserInput('<script>')).not.toContain('<');
  });
});
