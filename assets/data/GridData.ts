import { GridDataEntry, GridName } from "@src/types";
import gridDataJson from "./GriddierGridData.json";

export const GridData = gridDataJson as Partial<
  Record<GridName, GridDataEntry>
>;
