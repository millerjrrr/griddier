const returnFrequencyArray = (arr: number[]) => {
  if (arr.length === 0) return [];

  const maxVal = Math.max(...arr);
  const freq = new Array(maxVal + 1).fill(0);

  for (const num of arr) {
    freq[num]++;
  }

  return freq;
};

export default returnFrequencyArray;
