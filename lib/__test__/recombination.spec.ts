import { onlyFirstGeneRecombinator, bitwiseRecombinator } from '../recombination';

import { mocked } from 'ts-jest/utils';
import { Pair } from '../types';
import { getRandomBoolean, getRandomIntInRange } from '../random';

jest.mock('../random');

const mockedGetRandomBoolean = mocked(getRandomBoolean);
const mockedGetRandomIntInRange = mocked(getRandomIntInRange);

describe('chromosomeRecombinator', () => {
  describe('onlyFirstGeneRecombinator', () => {
    it('should returns the first gene', () => {
      const firstGene = 2;

      const actual = onlyFirstGeneRecombinator([firstGene, NaN]);

      expect(actual).toBe(firstGene);
    });
  });

  describe('bitwiseRecombinator', () => {
    it('should returns a gene with a size equal to the max size of the genes 1', () => {
      const genes: Pair<number> = [0b111111, 0b1];

      mockedGetRandomIntInRange.mockReturnValue(0);
      mockedGetRandomBoolean.mockReturnValue(true);

      const gene = bitwiseRecombinator(genes);
      const size = Math.ceil(Math.log2(gene));

      expect(size).toBe(6);
    });

    it('should returns a gene with a size equal to the max size of the genes 2', () => {
      const genes: Pair<number> = [0b1, 0b111111];

      mockedGetRandomBoolean.mockReturnValue(true);
      /**
       * Because the first gene is less than the second, we select the point of recombination equal to the max size
       * of genes. We want to check how the algorithm find the max size of genes, but not how it recombinate the genes.
       */
      mockedGetRandomIntInRange.mockReturnValue(6);

      const gene = bitwiseRecombinator(genes);
      const size = Math.ceil(Math.log2(gene));

      expect(size).toBe(6);
    });

    it('should choose a sign of the first gene', () => {
      const genes: Pair<number> = [-1, 1];

      /**
       * The sign of the first gene.
       */
      mockedGetRandomBoolean.mockReturnValue(true);
      mockedGetRandomIntInRange.mockReturnValue(0);

      const gene = bitwiseRecombinator(genes);

      expect(gene < 0).toBeTruthy();
    });

    it('should choose a sign of the second gene', () => {
      const genes: Pair<number> = [-1, 1];

      /**
       * The sign of the second gene
       */
      mockedGetRandomBoolean.mockReturnValue(false);
      mockedGetRandomIntInRange.mockReturnValue(0);

      const gene = bitwiseRecombinator(genes);

      expect(gene > 0).toBeTruthy();
    });

    it('should recombinate two genes', () => {
      const genes: Pair<number> = [-0b101010, 0b010101];

      /**
       * The sign of the first gene.
       */
      mockedGetRandomBoolean.mockReturnValue(true);
      mockedGetRandomIntInRange.mockReturnValue(2);

      const actual = bitwiseRecombinator(genes);

      expect(actual).toBe(-0b101001);
    });
  });
});
