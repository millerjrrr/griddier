export const moveToFront = <T>(
  arr: T[],
  index: number
): T[] => {
  if (index < 0 || index >= arr.length) return arr; // out-of-bounds safety

  const item = arr[index];
  return [
    item,
    ...arr.slice(0, index),
    ...arr.slice(index + 1),
  ];
};
