// TODO: Tests.
// TODO: Description.
export const getRange = (length: number): void[] => {
  return new Array(length).fill(undefined);
};

// TODO: Tests.
// TODO: Description.
export const getRangeWith = <T>(length: number, fn: (index: number) => T): T[] => {
  return getRange(length).map((_, index) => fn(index));
};
