import { createChromosomeFrom, createChromosome } from '../chromosome';

import { GeneFunction, GoalFunction } from '../types';

describe('chromosome', () => {
  let stubGoalFunction: GoalFunction<number>;

  beforeEach(() => {
    stubGoalFunction = jest.fn((genes) => Math.max(...genes));
  });

  describe('createChromosomeFrom', () => {
    it('should create the chromosome with the given genes', () => {
      const genes = [1, 2, 3, 4, 5];

      const actual = createChromosomeFrom(stubGoalFunction, genes);

      expect(actual.genes).toEqual(genes);
    });

    it('should calculate the fitness value by genes', () => {
      const genes = [1, 2, 3, 4, 5];

      const actual = createChromosomeFrom(stubGoalFunction, genes);

      expect(actual.fitness).toBe(5);
      expect(stubGoalFunction).toHaveBeenCalled();
    });
  });

  describe('createChromosome', () => {
    let stubGeneFunction: GeneFunction<number>;

    beforeEach(() => {
      stubGeneFunction = jest.fn((index) => index);
    });

    it('should create the genes list with the given size', () => {
      const actual = createChromosome(stubGoalFunction, stubGeneFunction, 4);

      expect(actual.genes.length).toBe(4);
    });

    it('should create the genes list with the geneFunctionValues', () => {
      const actual = createChromosome(stubGoalFunction, stubGeneFunction, 5);

      expect(actual.genes).toEqual([0, 1, 2, 3, 4]);
      expect(stubGeneFunction).toHaveBeenCalledTimes(5);
    });

    it('should calculate the fitness value by genes', () => {
      const actual = createChromosome(stubGoalFunction, stubGeneFunction, 5);

      expect(actual.fitness).toBe(4);
      expect(stubGoalFunction).toHaveBeenCalled();
    });
  });
});
