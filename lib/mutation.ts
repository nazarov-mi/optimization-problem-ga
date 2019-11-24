import { MutatorFunction } from './types';
import { bitsCount } from './math';
import { getRandomSign, getRandomIntInRange } from './random';

// TODO: Description.
export const makeOffsetMutator = (decimalPlace: number): MutatorFunction<number> => {
  if (decimalPlace < 1) {
    throw new Error('decimalPlace must be greater than or equal to 1');
  }

  const decimals = 10 ** decimalPlace;

  return (gene) => {
    const scale = getRandomIntInRange(0, decimals);
    const offset = gene * (scale / decimals);
    const offsetSign = getRandomSign();

    return gene + offsetSign * offset;
  };
};

// TODO: Description.
export const makeBitwiseMutator = (changesCount: number): MutatorFunction<number> => {
  if (changesCount < 1) {
    throw new Error('changesCount must be greater than or equal to 1');
  }

  return (gene) => {
    const size = bitsCount(gene) + 1;

    // TODO: Comments.
    while (changesCount--) {
      const pos = getRandomIntInRange(0, size);

      gene ^= 1 << pos;
    }

    return gene;
  };
};
