// TODO: Description.
export const getRandom = (scale: number): number => {
  return Math.random() * scale;
};

export const getRandomBoolean = (): boolean => {
  return getRandom(1) < 0.5;
};

export const getRandomSign = (): number => {
  return getRandomBoolean() ? 1 : -1;
};

export const getRandomInRange = (min: number, max: number): number => {
  return getRandom(max - min) + min;
};

export const getRandomIntInRange = (min: number, max: number): number => {
  return Math.floor(getRandom(max - min + 1)) + min;
};
