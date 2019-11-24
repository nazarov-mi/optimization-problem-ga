import { Pair, Chromosome, SelectorFunction } from './types';
import { getRandomIntInRange } from './random';

type BreedingType = 'in' | 'out';

// TODO: Description.
export const randomSelector: SelectorFunction<unknown> = (chromosomes) => {
  const chromosomesCount = chromosomes.length;
  const pairsCount = Math.floor(chromosomesCount / 2);
  const pairs: Pair<Chromosome<unknown>>[] = [];

  while (pairs.length < pairsCount) {
    const indexA = getRandomIntInRange(0, chromosomesCount - 1);
    const chromosomeA = chromosomes[indexA];
    let chromosomeB: Chromosome<unknown>;

    do {
      const indexB = getRandomIntInRange(0, chromosomesCount - 1);

      chromosomeB = chromosomes[indexB];
    } while (chromosomeA === chromosomeB);

    pairs.push([chromosomeA, chromosomeB]);
  }

  return pairs;
};

// TODO: Description.
export const makeFitnessBasedSelector =
  (type: BreedingType): SelectorFunction<unknown> =>
  (chromosomes) => {
    const chromosomesCount = chromosomes.length;
    const pairsCount = Math.floor(chromosomesCount / 2);
    const direction = type === 'in' ? 1 : -1;
    const pairs: Pair<Chromosome<unknown>>[] = [];

    // TODO: Comments.
    while (pairs.length < pairsCount) {
      const indexA = getRandomIntInRange(0, chromosomesCount - 1);
      const chromosomeA = chromosomes[indexA];
      let bestThreshold = Infinity;
      let chromosomeB = chromosomeA;

      for (let challengerIndex = 0; challengerIndex < chromosomesCount; ++challengerIndex) {
        const challengerChromosome = chromosomes[challengerIndex];

        if (challengerChromosome === chromosomeA) {
          continue;
        }

        const currentThreshold = Math.abs(chromosomeA.fitness - challengerChromosome.fitness) * direction;

        if (bestThreshold > currentThreshold) {
          bestThreshold = currentThreshold;
          chromosomeB = challengerChromosome;
        }
      }

      pairs.push([chromosomeA, chromosomeB]);
    }

    return pairs;
  };
