export type NonNegativeInteger = number & {
  readonly __brand: "NonNegativeInteger";
};

export const isNonNegativeInteger = (
  value: number,
): value is NonNegativeInteger => {
  return Number.isInteger(value) && value >= 0;
};

export const toNonNegativeInteger = (
  value: number,
): NonNegativeInteger => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`Invalid NonNegativeInteger: ${value}`);
  }

  return value as NonNegativeInteger;
};
