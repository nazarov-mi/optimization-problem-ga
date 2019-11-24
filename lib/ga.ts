import {
  Pair,
  Gene,
  Chromosome,
  GeneFunction,
  GoalFunction,
  RecombinatorFunction,
  MutatorFunction,
  Options,
} from './types';
import { createChromosomeFrom, createChromosome } from './chromosome';
import { getRandomIntInRange } from './random';
import { getRangeWith } from './utils';

// TODO: Description.
export const createPopulation = <T>(
  goalFunction: GoalFunction<T>,
  geneFunction: GeneFunction<T>,
  chromosomeSize: number,
  populationSize: number
): Chromosome<T>[] => {
  return getRangeWith(populationSize, () => createChromosome(goalFunction, geneFunction, chromosomeSize));
};

// TODO: Description.
export const recombinateChromosomes = <T>(
  goalFunction: GoalFunction<T>,
  recombinatorFunction: RecombinatorFunction<T>,
  probability: number,
  chromosomes: Pair<Chromosome<T>>
): Chromosome<T> => {
  const [chromosomeA, chromosomeB] = chromosomes;
  const genesA = chromosomeA.genes;
  const genesB = chromosomeB.genes;

  const newGenes = genesA.map((geneA, index) => {
    if (getRandomIntInRange(0, 100) > probability) {
      return geneA;
    }

    const geneB = genesB[index];

    return recombinatorFunction([geneA, geneB]);
  });

  return createChromosomeFrom(goalFunction, newGenes);
};

// TODO: Description.
export const mutateChromosome = <T>(
  goalFunction: GoalFunction<T>,
  mutatorFunction: MutatorFunction<T>,
  probability: number,
  chromosome: Chromosome<T>
): Chromosome<T> => {
  const { genes } = chromosome;

  const newGenes = genes.map((gene) => {
    if (getRandomIntInRange(0, 100) > probability) {
      return gene;
    }

    return mutatorFunction(gene);
  });

  return createChromosomeFrom(goalFunction, newGenes);
};

// TODO: Description.
export const getBestChromosome = <T>(chromosomes: Chromosome<T>[]): Chromosome<T> | null => {
  let bestChromosome: Chromosome<T> | null = null;

  for (const chromosome of chromosomes) {
    if (bestChromosome && bestChromosome.fitness < chromosome.fitness) {
      bestChromosome = chromosome;
    }
  }

  return bestChromosome;
};

// TODO: Tests.
export const ga = <T>({
  geneFunction,
  goalFunction,
  selectorFunction,
  recombinatorFunction,
  recombinationProbability,
  mutatorFunction,
  mutationProbability,
  populationSize,
  chromosomeSize,
  generationsCount,
}: Options<T>): Gene<T>[] => {
  // 1. Create a population.
  let population = createPopulation<T>(goalFunction, geneFunction, chromosomeSize, populationSize);
  let generationNumber = 1;

  // 2. Check all conditions. Continuous if everything is fine. Otherwise go to step 7.
  while (generationNumber <= generationsCount) {
    let nextPopulation: Chromosome<T>[] = [];

    // 3. Make pairs of chromosomes.
    const pairs = selectorFunction(population);

    // 4. Recombinate the pairs many times to fill a new population.
    while (nextPopulation.length < populationSize) {
      nextPopulation = pairs.reduce((acc, pair) => {
        const nextChromosome = recombinateChromosomes<T>(
          goalFunction,
          recombinatorFunction,
          recombinationProbability,
          pair
        );

        acc.push(nextChromosome);

        return acc;
      }, nextPopulation);
    }

    // 5. Mutate new chromosomes.
    nextPopulation = nextPopulation.map((chromosome) =>
      mutateChromosome<T>(goalFunction, mutatorFunction, mutationProbability, chromosome)
    );

    // 6. Go to step 2.
    generationNumber += 1;
    population = nextPopulation.slice(0, populationSize);
  }

  // 7. Done.
  const bestChromosome = getBestChromosome(population);

  return bestChromosome ? bestChromosome.genes : [];
};
