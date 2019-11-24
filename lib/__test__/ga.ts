import { createPopulation, recombinateChromosomes, mutateChromosome, getBestChromosome } from '../ga';

import { mocked } from 'ts-jest/utils';
import { GeneFunction, GoalFunction, RecombinatorFunction, MutatorFunction } from '../types';
import { createChromosomeFrom, createChromosome } from '../chromosome';
import { getRandomIntInRange } from '../random';

jest.mock('../random');

const mockedCreateChromosome = mocked(createChromosome);
const mockedGetRandomIntInRange = mocked(getRandomIntInRange);

describe('ga', () => {
  describe('createPopulation', () => {
    let stubGoalFunction: GoalFunction<number>;
    let stubGeneFunction: GeneFunction<number>;

    beforeEach(() => {
      stubGoalFunction = jest.fn(() => 0);
      stubGeneFunction = jest.fn(() => 0);
    });

    it('should create a population of the specified length', () => {
      const populationSize = 10;

      const actual = createPopulation(stubGoalFunction, stubGeneFunction, 1, populationSize);

      expect(actual.length).toBe(populationSize);
    });

    it('should create a population with mockedCreateChromosome', () => {
      const populationSize = 15;

      createPopulation(stubGoalFunction, stubGeneFunction, 1, populationSize);

      expect(mockedCreateChromosome).toHaveBeenCalledTimes(populationSize);
    });
  });

  describe('recombinateChromosomes', () => {
    let stubGoalFunction: GoalFunction<number>;
    let stubRecombinatorFunction: RecombinatorFunction<number>;

    beforeEach(() => {
      stubGoalFunction = jest.fn(() => 0);
      stubRecombinatorFunction = jest.fn(([geneA, geneB]) => geneA * geneB);
    });

    it('should returns only genes of the first chromosome, if a random value is greater than a probability', () => {
      const chromosomeA = createChromosomeFrom(stubGoalFunction, [1, 2, 3, 4]);
      const chromosomeB = createChromosomeFrom(stubGoalFunction, [5, 6, 7, 8]);

      mockedGetRandomIntInRange.mockReturnValue(50);

      const actual = recombinateChromosomes(stubGoalFunction, stubRecombinatorFunction, 0, [chromosomeA, chromosomeB]);

      expect(actual.genes).toEqual(chromosomeA.genes);
      expect(stubRecombinatorFunction).not.toHaveBeenCalled();
    });

    it('should returns cross product of two genes, if a random value is less than or equal to a probability', () => {
      const chromosomeA = createChromosomeFrom(stubGoalFunction, [1, 2, 3, 4]);
      const chromosomeB = createChromosomeFrom(stubGoalFunction, [5, 6, 7, 8]);

      mockedGetRandomIntInRange.mockReturnValue(50);

      const actual = recombinateChromosomes(stubGoalFunction, stubRecombinatorFunction, 100, [
        chromosomeA,
        chromosomeB,
      ]);

      expect(actual.genes).toEqual([5, 12, 21, 32]);
      expect(stubRecombinatorFunction).toHaveBeenCalledTimes(4);
    });
  });

  describe('mutateChromosome', () => {
    let stubGoalFunction: GoalFunction<number>;
    let stubMutatorFunction: MutatorFunction<number>;

    beforeEach(() => {
      stubGoalFunction = jest.fn(() => 0);
      stubMutatorFunction = jest.fn((gene) => gene * 2);
    });

    it('should returns genes without changing', () => {
      const chromosome = createChromosomeFrom(stubGoalFunction, [1, 2, 3, 4]);

      mockedGetRandomIntInRange.mockReturnValue(50);

      const actual = mutateChromosome(stubGoalFunction, stubMutatorFunction, 0, chromosome);

      expect(actual.genes).toEqual(chromosome.genes);
      expect(stubMutatorFunction).not.toHaveBeenCalled();
    });

    it('should returns mutate genes, if a random value is less than or equal to a probability', () => {
      const chromosome = createChromosomeFrom(stubGoalFunction, [1, 2, 3, 4]);

      mockedGetRandomIntInRange.mockReturnValue(50);

      const actual = mutateChromosome(stubGoalFunction, stubMutatorFunction, 100, chromosome);

      expect(actual.genes).toEqual([2, 4, 6, 8]);
      expect(stubMutatorFunction).toHaveBeenCalledTimes(4);
    });
  });

  describe('getBestChromosome', () => {
    let stubGoalFunction: GoalFunction<number>;

    beforeEach(() => {
      stubGoalFunction = jest.fn(([firstGene]) => firstGene);
    });

    it('should return the best chromosome 1', () => {
      const chromosomeA = createChromosomeFrom(stubGoalFunction, [1]);
      const chromosomeB = createChromosomeFrom(stubGoalFunction, [3]);
      const chromosomeC = createChromosomeFrom(stubGoalFunction, [2]);

      const actual = getBestChromosome([chromosomeA, chromosomeB, chromosomeC]);

      expect(actual).toBe(chromosomeB);
    });

    it('should return the best chromosome 2', () => {
      const actual = getBestChromosome([]);

      expect(actual).toBeNull();
    });
  });
});
