import { getRandom, getRandomBoolean, getRandomSign, getRandomInRange, getRandomIntInRange } from '../random';

import { getRangeWith } from '../utils';

const ITERATIONS_COUNT = 100;

describe('random', () => {
  let mockedMathRandom: jest.MockedFunction<any>;

  beforeEach(() => {
    mockedMathRandom = jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    mockedMathRandom.mockRestore();
  });

  describe('getRandom', () => {
    it('should returns the upper bound of the range', () => {
      mockedMathRandom.mockReturnValueOnce(1);

      const actual = getRandom(10);

      expect(actual).toBe(10);
    });

    it('should returns values in the given range', () => {
      const values = getRangeWith(ITERATIONS_COUNT, () => getRandom(10));

      values.forEach((value) => {
        expect(value >= 0 && value <= 10).toBeTruthy();
      });
    });
  });

  describe('getRandomBoolean', () => {
    it('should returns the truthy value', () => {
      mockedMathRandom.mockReturnValueOnce(0);

      const actual = getRandomBoolean();

      expect(actual).toBeTruthy();
    });

    it('should returns the falsy value', () => {
      /**
       * Math.random returns values in the [0, 1) range
       */
      mockedMathRandom.mockReturnValueOnce(0.99999);

      const actual = getRandomBoolean();

      expect(actual).toBeFalsy();
    });
  });

  describe('getRandomSign', () => {
    it('should returns 1', () => {
      mockedMathRandom.mockReturnValueOnce(0);

      const actual = getRandomSign();

      expect(actual).toBe(1);
    });

    it('should returns -1', () => {
      /**
       * Math.random returns values in the [0, 1) range
       */
      mockedMathRandom.mockReturnValueOnce(0.99999);

      const actual = getRandomSign();

      expect(actual).toBe(-1);
    });
  });

  describe('getRandomInRange', () => {
    it('should returns the lower bound of the range', () => {
      mockedMathRandom.mockReturnValueOnce(0);

      const actual = getRandomInRange(10, 20);

      expect(actual).toBe(10);
    });

    it('should returns the upper bound of the range', () => {
      mockedMathRandom.mockReturnValueOnce(1);

      const actual = getRandomInRange(10, 20);

      expect(actual).toBe(20);
    });

    it('should returns values in the given range', () => {
      const values = getRangeWith(ITERATIONS_COUNT, () => getRandomInRange(10, 20));

      values.forEach((value) => {
        expect(value >= 10 && value <= 20).toBeTruthy();
      });
    });
  });

  describe('getRandomIntInRange', () => {
    it('should returns the lower bound of the range', () => {
      mockedMathRandom.mockReturnValueOnce(0);

      const actual = getRandomIntInRange(10, 20);

      expect(actual).toBe(10);
    });

    it('should returns the upper bound of the range', () => {
      /**
       * Math.random returns values in the [0, 1) range
       */
      mockedMathRandom.mockReturnValueOnce(0.99999);

      const actual = getRandomIntInRange(10, 20);

      expect(actual).toBe(20);
    });

    it('should returns values in the given range', () => {
      const values = getRangeWith(ITERATIONS_COUNT, () => getRandomIntInRange(10, 20));

      values.forEach((value) => {
        expect(value >= 10 && value <= 20).toBeTruthy();
      });
    });

    it('should returns only integer values', () => {
      const values = getRangeWith(ITERATIONS_COUNT, () => getRandomIntInRange(10, 20));

      values.forEach((value) => {
        const actual = Math.floor(value);

        expect(actual).toBe(value);
      });
    });
  });
});
