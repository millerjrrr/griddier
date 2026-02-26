export const ALL_STACK_SIZES = [50, 100] as const;
export type StackSize = (typeof ALL_STACK_SIZES)[number];
