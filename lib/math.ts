// TODO: Description.
export const bitsCount = (value: number): number => {
  if (value <= 0) {
    return 0
  }

  return Math.floor(Math.log2(value)) + 1
}
