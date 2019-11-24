import { makeOffsetMutator, makeBitwiseMutator } from '../mutation';

import { mocked } from 'ts-jest/utils';
import { getRandomSign, getRandomIntInRange } from '../random';

jest.mock('../random');

const mockedGetRandomSign = mocked(getRandomSign);
const mockedGetRandomIntInRange = mocked(getRandomIntInRange);

describe('mutation', () => {
  describe('makeOffsetMutator', () => {
    describe('#', () => {
      it('should throw error, if decimalPlace is less than 1', () => {
        expect(() => {
          makeOffsetMutator(0);
        }).toThrowError('decimalPlace must be greater than or equal to 1');
      });
    });

    describe('offsetGeneMutator', () => {
      it('should mutate gene with the given offset 1', () => {
        mockedGetRandomSign.mockReturnValue(-1);
        mockedGetRandomIntInRange.mockReturnValue(50);

        const actual = makeOffsetMutator(3)(12.5);

        expect(actual).toBe(11.875);
      });

      it('should mutate gene with the given offset 2', () => {
        mockedGetRandomSign.mockReturnValue(1);
        mockedGetRandomIntInRange.mockReturnValue(50);

        const actual = makeOffsetMutator(2)(12.5);

        expect(actual).toBe(18.75);
      });
    });
  });

  describe('makeBitwiseMutator', () => {
    describe('#', () => {
      it('should throw error, if changeGeneCount is less than 1', () => {
        expect(() => {
          makeBitwiseMutator(0);
        }).toThrowError('changesCount must be greater than or equal to 1');
      });
    });

    describe('bitwiseGeneMutator', () => {
      it('should chnage some bits in the gene 1', () => {
        const gene = 0b101010;

        mockedGetRandomIntInRange.mockReturnValueOnce(0).mockReturnValueOnce(2).mockReturnValue(5);

        const actual = makeBitwiseMutator(3)(gene);

        expect(actual).toBe(0b1111);
      });

      it('should chnage some bits in the gene 2', () => {
        const gene = -0b101010;

        mockedGetRandomIntInRange.mockReturnValueOnce(0).mockReturnValueOnce(2).mockReturnValue(5);

        const actual = makeBitwiseMutator(3)(gene);

        expect(actual).toBe(-0b1101);
      });
    });
  });
});
