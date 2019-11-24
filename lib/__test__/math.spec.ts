import { bitsCount } from '../math';

describe('math', () => {
  describe('bitsCount', () => {
    it('should returns count of bits', () => {
      const values = [0b1, 0b10, 0b11, 0b100, 0b101, 0b110, 0b111, 0b1000, 0b1001, 0b1010];
      const actual = values.map((value) => bitsCount(value));

      expect(actual).toEqual([1, 2, 2, 3, 3, 3, 3, 4, 4, 4]);
    });

    it('should returns 0, if the value less than or equal to 0', () => {
      const values = [-10, 0];
      const actual = values.map((value) => bitsCount(value));

      expect(actual).toEqual([0, 0]);
    });
  });
});
