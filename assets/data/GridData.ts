import { GridDataEntry } from "@src/types";
import gridDataJson from "./GridData.json";
import { OrderedKey } from "./OrderedKeys";

type GridDataMap<GridDataEntry> = {
  [K in OrderedKey]: GridDataEntry;
};

export const GridData =
  gridDataJson as GridDataMap<GridDataEntry>;
