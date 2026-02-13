import { OrderedKey, OrderedKeys } from "./OrderedKeys";

export type RangeId = `R${string}`;

export const RangeIdMap = OrderedKeys.reduce(
  (acc, key, index) => {
    const id =
      `R${String(index + 1).padStart(6, "0")}` as RangeId;
    acc[key] = id;
    return acc;
  },
  {} as Record<OrderedKey, RangeId>,
);
