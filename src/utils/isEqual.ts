const isEqual = (
  a: number,
  b: number,
  tolerance = 0.001
): boolean => Math.abs(a - b) < tolerance;

export default isEqual;
