const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync"); // use sync parse for simplicity

const handsArray = [
  "AA",
  "AKs",
  "AQs",
  "AJs",
  "ATs",
  "A9s",
  "A8s",
  "A7s",
  "A6s",
  "A5s",
  "A4s",
  "A3s",
  "A2s",
  "AKo",
  "KK",
  "KQs",
  "KJs",
  "KTs",
  "K9s",
  "K8s",
  "K7s",
  "K6s",
  "K5s",
  "K4s",
  "K3s",
  "K2s",
  "AQo",
  "KQo",
  "QQ",
  "QJs",
  "QTs",
  "Q9s",
  "Q8s",
  "Q7s",
  "Q6s",
  "Q5s",
  "Q4s",
  "Q3s",
  "Q2s",
  "AJo",
  "KJo",
  "QJo",
  "JJ",
  "JTs",
  "J9s",
  "J8s",
  "J7s",
  "J6s",
  "J5s",
  "J4s",
  "J3s",
  "J2s",
  "ATo",
  "KTo",
  "QTo",
  "JTo",
  "TT",
  "T9s",
  "T8s",
  "T7s",
  "T6s",
  "T5s",
  "T4s",
  "T3s",
  "T2s",
  "A9o",
  "K9o",
  "Q9o",
  "J9o",
  "T9o",
  "99",
  "98s",
  "97s",
  "96s",
  "95s",
  "94s",
  "93s",
  "92s",
  "A8o",
  "K8o",
  "Q8o",
  "J8o",
  "T8o",
  "98o",
  "88",
  "87s",
  "86s",
  "85s",
  "84s",
  "83s",
  "82s",
  "A7o",
  "K7o",
  "Q7o",
  "J7o",
  "T7o",
  "97o",
  "87o",
  "77",
  "76s",
  "75s",
  "74s",
  "73s",
  "72s",
  "A6o",
  "K6o",
  "Q6o",
  "J6o",
  "T6o",
  "96o",
  "86o",
  "76o",
  "66",
  "65s",
  "64s",
  "63s",
  "62s",
  "A5o",
  "K5o",
  "Q5o",
  "J5o",
  "T5o",
  "95o",
  "85o",
  "75o",
  "65o",
  "55",
  "54s",
  "53s",
  "52s",
  "A4o",
  "K4o",
  "Q4o",
  "J4o",
  "T4o",
  "94o",
  "84o",
  "74o",
  "64o",
  "54o",
  "44",
  "43s",
  "42s",
  "A3o",
  "K3o",
  "Q3o",
  "J3o",
  "T3o",
  "93o",
  "83o",
  "73o",
  "63o",
  "53o",
  "43o",
  "33",
  "32s",
  "A2o",
  "K2o",
  "Q2o",
  "J2o",
  "T2o",
  "92o",
  "82o",
  "72o",
  "62o",
  "52o",
  "42o",
  "32o",
  "22",
];

const allowedValues = [0, 0.25, 0.5, 0.75, 1];
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
const outputDir = path.join(__dirname, "assets/data");

// Helper: parse CSV into columns of mapped values (like your convertMatrixCsvToTs)
function parseMatrixCsvToColumns(filePath) {
  const rawData = fs.readFileSync(filePath, "utf8");
  const rows = parse(rawData, { trim: true });

  if (rows.length !== 169) {
    throw new Error(
      `${path.basename(
        filePath
      )} must have exactly 169 rows.`
    );
  }

  const numCols = rows[0].length - 1;
  const columns = Array.from({ length: numCols }, () => []);

  for (let rowIndex = 0; rowIndex < 169; rowIndex++) {
    const row = rows[rowIndex];
    row.slice(1).forEach((val, colIndex) => {
      const parsed = parseFloat(val);
      if (!allowedValues.includes(parsed)) {
        throw new Error(
          `Invalid value '${val}' at row ${
            rowIndex + 1
          }, col ${colIndex + 1} in ${path.basename(
            filePath
          )}`
        );
      }
      columns[colIndex].push(valueMap[parsed]);
    });
  }

  return columns;
}

// Read gridNames from ActionList.csv
function getGridNamesPrioritiesAndFeaturedHands() {
  const rawData = fs.readFileSync(
    path.join(inputDir, "GriddierRanges - Action List.csv"),
    "utf8"
  );
  const rows = rawData
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split(",")
        .map((cell) => cell.trim())
    )
    .filter((row) => row.length >= 2 && row[0] && row[1])
    .slice(1);

  const seenNames = new Set();
  const gridTrio = [];
  const priorities = [];

  // Extract gridName and priority from each row
  rows.forEach((row, rowIndex) => {
    const gridName = row[0];
    const priorityStr = row[1];

    if (seenNames.has(gridName)) {
      throw new Error(
        `Duplicate grid name "${gridName}" at row ${
          rowIndex + 1
        }`
      );
    }
    seenNames.add(gridName);

    const priority = parseInt(priorityStr);
    if (
      isNaN(priority) ||
      priority < 1 ||
      priority > rows.length ||
      priorities.includes(priority)
    ) {
      throw new Error(
        `Invalid priority "${priorityStr}" at row ${
          rowIndex + 1
        }`
      );
    } else priorities.push(priority);

    // Collect featured hands from remaining cells (ignoring null/empty)
    const featuredRaw = row
      .slice(3)
      .filter((v) => v && v.trim());
    const featured = [...new Set(featuredRaw)]; // ensure uniqueness

    if (featured.length !== featuredRaw.length) {
      console.warn(
        `Warning: Duplicate featured hands found in row ${
          rowIndex + 1
        } for grid "${gridName}". Duplicates removed.`
      );
    }

    gridTrio.push({
      gridName,
      priority,
      featured,
    });
  });

  return gridTrio;
}

function buildCombinedData() {
  // Parse each matrix
  const allInCols = parseMatrixCsvToColumns(
    path.join(inputDir, "GriddierRanges - AllInMatrix.csv")
  );
  const callCols = parseMatrixCsvToColumns(
    path.join(inputDir, "GriddierRanges - CallMatrix.csv")
  );
  const raiseCols = parseMatrixCsvToColumns(
    path.join(inputDir, "GriddierRanges - RaiseMatrix.csv")
  );
  const priorCols = parseMatrixCsvToColumns(
    path.join(inputDir, "GriddierRanges - PriorMatrix.csv")
  );

  // Get gridNames
  const gridTrio = getGridNamesPrioritiesAndFeaturedHands();

  if (
    ![allInCols, callCols, raiseCols, priorCols].every(
      (cols) => cols.length === gridTrio.length
    )
  ) {
    throw new Error(
      `Mismatch between gridNames row count and matrix columns count: \n Matrix Columns Count = ${allInCols.length} \n GridNames rows count = ${gridNames.length}`
    );
  }

  // Build combined JSON
  const combined = {};

  gridTrio.forEach((gridPriorityPair, colIndex) => {
    const { gridName, priority, featured } =
      gridPriorityPair;
    combined[gridName] = { hands: {}, priority, featured };

    for (let rowIndex = 0; rowIndex < 169; rowIndex++) {
      const hand = handsArray[rowIndex];
      combined[gridName].hands[hand] = {
        allin: allInCols[colIndex][rowIndex],
        call: callCols[colIndex][rowIndex],
        raise: raiseCols[colIndex][rowIndex],
        prior: priorCols[colIndex][rowIndex],
      };
    }
  });

  return combined;
}

function saveCombinedDataToFile(data) {
  const tsContent = `import { GridDataEntry } from "@src/types";\n
export const GridData:Record<string, GridDataEntry> = ${JSON.stringify(
    data,
    null,
    2
  )};\n`;

  const outputPath = path.join(outputDir, "GridData.ts");
  fs.writeFileSync(outputPath, tsContent, "utf8");
  console.log(`✅ Saved combined data to ${outputPath}`);
}

// Run all
try {
  const combinedData = buildCombinedData();
  saveCombinedDataToFile(combinedData);
} catch (err) {
  console.error("❌ Error building combined data:", err);
}
