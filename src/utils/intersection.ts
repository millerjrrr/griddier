import { Hand } from "./handsArrayLogic";

const intersection = (a: Hand[], b: Hand[]): Hand[] => {
  const setB = new Set(b);
  return [...new Set(a.filter((x) => setB.has(x)))];
};

export default intersection;
