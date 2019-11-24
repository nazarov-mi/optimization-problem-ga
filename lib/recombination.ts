// TODO: Add randomRecombinator.
import { RecombinatorFunction } from './types';
import { bitsCount } from './math';
import { getRandomIntInRange, getRandomBoolean } from './random';

// TODO: Description.
export const onlyFirstGeneRecombinator: RecombinatorFunction<unknown> = (genes) => {
  const [firstGene] = genes;

  return firstGene;
};

// TODO: Description.
export const bitwiseRecombinator: RecombinatorFunction<number> = (genes) => {
  // TODO: Comments.
  const [geneA, geneB] = genes;

  const signA = Math.sign(geneA);
  const signB = Math.sign(geneB);

  const absGeneA = Math.abs(geneA);
  const absGeneB = Math.abs(geneB);

  const sizeA = bitsCount(absGeneA);
  const sizeB = bitsCount(absGeneB);
  const size = Math.max(sizeA, sizeB);

  const pos = getRandomIntInRange(0, size);

  const mask = -1 >>> (32 - size);
  const maskA = (mask << pos) & mask;
  const maskB = mask >> (size - pos);

  const newSign = getRandomBoolean() ? signA : signB;
  const newGene = (absGeneA & maskA) | (absGeneB & maskB);

  return newSign * newGene;
};
