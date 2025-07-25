import { DataEntry } from "@src/types"; // adjust path as needed
import { addUserData } from "./addUserData";

const getInitialUserData = (): DataEntry[] => {
  return addUserData([]);
};

export default getInitialUserData;
