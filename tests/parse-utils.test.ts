import { describe, it, expect } from 'vitest';
import { generateSlug, formatDate, formatRelativeTime, truncateText } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('generateSlug', () => {
    it('should generate a valid slug from a title', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Test & Development')).toBe('test-development');
      expect(generateSlug('Special Characters!@#$%')).toBe('special-characters');
    });

    it('should handle empty strings', () => {
      expect(generateSlug('')).toBe('');
    });

    it('should handle multiple spaces and special characters', () => {
      expect(generateSlug('Multiple   Spaces')).toBe('multiple-spaces');
      expect(generateSlug('Special@#$%Characters')).toBe('specialcharacters');
    });
  });

  describe('formatDate', () => {
    it('should format dates correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toBe('January 15, 2024');
    });

    it('should handle string dates', () => {
      expect(formatDate('2024-01-15')).toBe('January 15, 2024');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format recent times correctly', () => {
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      expect(formatRelativeTime(oneMinuteAgo)).toBe('1m ago');
      expect(formatRelativeTime(oneHourAgo)).toBe('1h ago');
      expect(formatRelativeTime(oneDayAgo)).toBe('1d ago');
    });

    it('should handle just now', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe('just now');
    });
  });

  describe('truncateText', () => {
    it('should truncate text that exceeds max length', () => {
      const text = 'This is a very long text that should be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('should not truncate text that is within max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('should handle empty strings', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });
});
