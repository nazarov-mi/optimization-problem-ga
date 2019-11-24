import { Gene, Chromosome, GeneFunction, GoalFunction } from './types';

// TODO: Description.
// TODO: Tests.
const createGenesList = <T>(geneFunction: GeneFunction<T>, size: number): Gene<T>[] => {
  const genes = [];

  for (let index = 0; index < size; ++index) {
    genes.push(geneFunction(index));
  }

  return genes;
};

// TODO: Description.
// TODO: Tests.
export const createChromosomeFrom = <T>(goalFunction: GoalFunction<T>, genes: Gene<T>[]): Chromosome<T> => {
  const fitness = goalFunction(genes);

  return { genes, fitness };
};

// TODO: Description.
// TODO: Tests.
export const createChromosome = <T>(
  goalFunction: GoalFunction<T>,
  geneFunction: GeneFunction<T>,
  size: number
): Chromosome<T> => {
  const genes = createGenesList(geneFunction, size);

  return createChromosomeFrom(goalFunction, genes);
};
