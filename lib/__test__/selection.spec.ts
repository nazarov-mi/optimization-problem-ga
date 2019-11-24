import * as selectionModule from '../selection';

import { mocked } from 'ts-jest/utils';
import { Chromosome } from '../types';
import { createChromosome } from '../chromosome';
import { getRangeWith } from '../utils';

const getChromosomesRange = (length: number): Chromosome<number>[] => {
  return getRangeWith(length, (index) =>
    // TODO: Comment.
    createChromosome(
      ([firstGene]) => firstGene,
      () => index,
      1
    )
  );
};

describe('selection', () => {
  let selection: typeof selectionModule;

  beforeEach(() => {
    jest.resetModules();

    selection = require('../selection');
  });

  describe('randomSelector', () => {
    beforeEach(() => {
      jest.unmock('../random');
    });

    it('should returns pairs, which count equal to half of chromosomes count 1', () => {
      const { getRandomIntInRange } = require('../random');

      const chromosomes = getChromosomesRange(20);
      const expected = chromosomes.length / 2;

      const pairs = selection.randomSelector(chromosomes);

      expect(pairs.length).toBe(expected);
    });

    it('should returns pairs, which count equal to half of chromosomes count 2', () => {
      const chromosomes = getChromosomesRange(21);
      const expected = Math.floor(chromosomes.length / 2);

      const pairs = selection.randomSelector(chromosomes);

      expect(pairs.length).toBe(expected);
    });

    it('should returns pairs, is which indexies not like each other', () => {
      const chromosomes = getChromosomesRange(20);

      const pairs = selection.randomSelector(chromosomes);

      pairs.forEach(([indexA, indexB]) => {
        expect(indexA).not.toBe(indexB);
      });
    });
  });

  describe('makeFitnessBasedSelector', () => {
    let mockedGetRandomIntInRange: jest.MockedFunction<any>;

    beforeEach(() => {
      jest.doMock('../random');

      const { getRandomIntInRange } = require('../random');

      mockedGetRandomIntInRange = mocked(getRandomIntInRange);
    });

    describe('fitnessBasedSelectoror', () => {
      it('should returns pairs, which count equals to half of chromosomes count 1', () => {
        const chromosomes = getChromosomesRange(20);
        const expected = chromosomes.length / 2;

        mockedGetRandomIntInRange.mockReturnValue(0);

        const pairs = selection.makeFitnessBasedSelector('in')(chromosomes);

        expect(pairs.length).toBe(expected);
      });

      it('should returns pairs, which count equals to half of chromosomes count 2', () => {
        const chromosomes = getChromosomesRange(21);
        const expected = Math.floor(chromosomes.length / 2);

        mockedGetRandomIntInRange.mockReturnValue(0);

        const pairs = selection.makeFitnessBasedSelector('in')(chromosomes);

        expect(pairs.length).toBe(expected);
      });

      it('should use inbreeding strategy 1', () => {
        // Fitnesses: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        const chromosomes = getChromosomesRange(10);

        mockedGetRandomIntInRange.mockReturnValue(0);

        const [firstPair] = selection.makeFitnessBasedSelector('in')(chromosomes);

        expect(firstPair).toEqual([chromosomes[0], chromosomes[1]]);
      });

      it('should use inbreeding strategy 2', () => {
        // Fitnesses: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        const chromosomes = getChromosomesRange(10);

        mockedGetRandomIntInRange.mockReturnValue(9);

        const [firstPair] = selection.makeFitnessBasedSelector('in')(chromosomes);

        expect(firstPair).toEqual([chromosomes[9], chromosomes[8]]);
      });

      it('should use outbreeding strategy 1', () => {
        // Fitnesses: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        const chromosomes = getChromosomesRange(10);

        mockedGetRandomIntInRange.mockReturnValue(0);

        const [firstPair] = selection.makeFitnessBasedSelector('out')(chromosomes);

        expect(firstPair).toEqual([chromosomes[0], chromosomes[9]]);
      });

      it('should use outbreeding strategy 2', () => {
        // Fitnesses: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        const chromosomes = getChromosomesRange(10);

        mockedGetRandomIntInRange.mockReturnValue(9);

        const [firstPair] = selection.makeFitnessBasedSelector('out')(chromosomes);

        expect(firstPair).toEqual([chromosomes[9], chromosomes[0]]);
      });
    });
  });
});
