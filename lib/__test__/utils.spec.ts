import { getRange, getRangeWith } from '../utils';

describe('utils', () => {
  describe('getRange', () => {
    it('should returns a range with the given length 1', () => {
      const actual = getRange(3);

      expect(actual.length).toBe(3);
    });

    it('should returns a range with the given length 2', () => {
      const actual = getRange(10);

      expect(actual.length).toBe(10);
    });

    it('should returns a range filled with an undefined', () => {
      const actual = getRange(123);

      expect(actual.every((value) => value === undefined)).toBeTruthy();
    });
  });

  describe('getRangeWith', () => {
    it('should returns a range with the given length 1', () => {
      const actual = getRangeWith(3, () => undefined);

      expect(actual.length).toBe(3);
    });

    it('should returns a range with the given length 2', () => {
      const actual = getRangeWith(10, () => undefined);

      expect(actual.length).toBe(10);
    });

    it('should returns a range filled with the function values', () => {
      const actual = getRangeWith(5, (index) => index * index);

      expect(actual).toEqual([0, 1, 4, 9, 16]);
    });
  });
});
