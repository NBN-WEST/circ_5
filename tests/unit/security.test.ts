import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateApiKey } from '../../src/utils/security';

describe('Security - Input Sanitization', () => {
  it('should remove dangerous characters', () => {
    const result = sanitizeInput('<script>alert("xss")</script>');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('should trim whitespace', () => {
    expect(sanitizeInput('  test  ')).toBe('test');
  });

  it('should limit input length', () => {
    const longInput = 'a'.repeat(2000);
    expect(sanitizeInput(longInput).length).toBe(1000);
  });
});

describe('Security - API Key Validation', () => {
  it('should accept valid Anthropic API keys', () => {
    expect(validateApiKey('sk-ant-1234567890abcdefghij')).toBe(true);
  });

  it('should reject invalid API keys', () => {
    expect(validateApiKey('invalid-key')).toBe(false);
    expect(validateApiKey('sk-wrong-prefix')).toBe(false);
    expect(validateApiKey('')).toBe(false);
  });
});
