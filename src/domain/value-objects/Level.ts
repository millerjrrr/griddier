export type Level =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

export const toLevel = (value: number): Level => {
  if (!Number.isInteger(value) || value < 0 || value > 30) {
    throw new Error(`Invalid Level: ${value}`);
  }

  return value as Level;
};
