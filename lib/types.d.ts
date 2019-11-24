export type Pair<T> = [T, T];

export type Gene<T> = T;

export type Chromosome<T> = {
  genes: Gene<T>[];
  fitness: number;
};

export type GeneFunction<T> = (index: number) => Gene<T>;
export type GoalFunction<T> = (genes: Gene<T>[]) => number;
export type SelectorFunction<T> = (chromosomes: Chromosome<T>[]) => Pair<Chromosome<T>>[];
export type RecombinatorFunction<T> = (genes: Pair<Gene<T>>) => Gene<T>;
export type MutatorFunction<T> = (gene: Gene<T>) => Gene<T>;

export type Options<T> = {
  geneFunction: GeneFunction<T>;
  goalFunction: GoalFunction<T>;
  selectorFunction: SelectorFunction<T>;
  recombinatorFunction: RecombinatorFunction<T>;
  recombinationProbability: number;
  mutatorFunction: MutatorFunction<T>;
  mutationProbability: number;
  populationSize: number;
  chromosomeSize: number;
  generationsCount: number;
};
