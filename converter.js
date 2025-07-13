const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const allowedValues = [0, 0.25, 0.5, 0.75, 1];
const isValid = (value) =>
  allowedValues.includes(parseFloat(value));

const valueMap = {
  0: 0,
  0.25: 1,
  0.5: 2,
  0.75: 3,
  1: 4,
};

const inputDir = path.join(
  __dirname,
  "assets/data/inputCSVs"
);
const outputDir = path.join(
  __dirname,
  "assets/data/dataArrays"
);

/**
 * Converts a 169xN CSV file into a ValidFraction[][] .ts file.
 * Values are mapped: 0 → 0, 0.25 → 1, 0.5 → 2, 0.75 → 3, 1 → 4
 */
function convertMatrixCsvToTs(inputPath, outputPath) {
  const rawData = fs.readFileSync(inputPath, "utf8");

  parse(rawData, { trim: true }, (err, rows) => {
    if (err) throw err;

    if (rows.length !== 169) {
      throw new Error(
        `${path.basename(
          inputPath
        )} must have exactly 169 rows.`
      );
    }

    const numCols = rows[0].length - 1;
    const columns = Array.from(
      { length: numCols },
      () => []
    );

    for (let rowIndex = 0; rowIndex < 169; rowIndex++) {
      const row = rows[rowIndex];
      row.slice(1).forEach((val, colIndex) => {
        const parsed = parseFloat(val);
        if (!isValid(parsed)) {
          throw new Error(
            `Invalid value '${val}' at row ${
              rowIndex + 1
            }, col ${colIndex + 1} in ${path.basename(
              inputPath
            )}`
          );
        }

        const mapped = valueMap[parsed];
        columns[colIndex].push(mapped);
      });
    }

    const tsContent = `import { ValidFraction } from "../../../src/types";
export const gridData: ValidFraction[][] = ${JSON.stringify(
      columns,
      null,
      2
    )};\n`;

    fs.writeFileSync(outputPath, tsContent, "utf8");
    console.log(
      `✅ Converted ${path.basename(
        inputPath
      )} → ${path.basename(outputPath)}`
    );
  });
}

/**
 * Converts a freeform CSV into a string[][] .ts file (e.g. FilteredDrilling)
 */
function importActionListData() {
  const rawData = fs.readFileSync(
    path.join(inputDir, "ActionList.csv")
  );

  parse(
    rawData,
    { trim: true, skipEmptyLines: true },
    (err, rows) => {
      if (err) throw err;

      // Skip first row, then map over remaining rows
      const cleanedRows = rows
        .slice(1)
        .map((row) =>
          row.slice(3).filter((cell) => cell.trim() !== "")
        );

      const tsContent = `export const drillingData: string[][] = ${JSON.stringify(
        cleanedRows,
        null,
        2
      )};\n`;

      fs.writeFileSync(
        path.join(outputDir, "FilteredDrilling.ts"),
        tsContent,
        "utf8"
      );
      console.log(`✅ Converted ActionList`);

      // import the priorities
      const priorities = rows
        .slice(1)
        .map((row) => Number(row[1]));
      const tsContentForPriorities = `export const Priorities: number[] = ${JSON.stringify(
        priorities
      )};\n`;

      fs.writeFileSync(
        path.join(outputDir, "Priorities.ts"),
        tsContentForPriorities,
        "utf8"
      );

      // import the gridNames
      const gridNames = rows.slice(1).map((row) => row[0]);
      const tsContentForGridNames = `export const gridNames: string[] = ${JSON.stringify(
        gridNames
      )};\n`;

      fs.writeFileSync(
        path.join(outputDir, "gridNames.ts"),
        tsContentForGridNames,
        "utf8"
      );
    }
  );
}

// Convert the main grid matrices
[
  "AllInMatrix",
  "CallMatrix",
  "RaiseMatrix",
  "PriorMatrix",
].forEach((name) => {
  const inputPath = path.join(inputDir, `${name}.csv`);
  const outputPath = path.join(outputDir, `${name}.ts`);
  convertMatrixCsvToTs(inputPath, outputPath);
});

importActionListData();
