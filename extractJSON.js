// extractGridData.js
import fs from "fs";
import vm from "vm";
import path from "path";

// Path to your TS file
const tsFilePath = path.resolve(
  "./assets/data/GridData.ts"
);
const outputJsonPath = path.resolve(
  "./assets/data/GridData.json"
);

// Read the TS file
const tsCode = fs.readFileSync(tsFilePath, "utf8");

// Step 1: Strip out TypeScript type annotations like ": GridDataMap<GridDataEntry>"
const cleanedCode = tsCode.replace(
  /:\s*GridDataMap<[^>]+>\s*/g,
  ""
);

// Step 2: Match the object definition
const match = cleanedCode.match(
  /export const GridData\s*=\s*({[\s\S]*});/
);

if (!match) {
  console.error(
    "❌ Could not find GridData object in the file."
  );
  process.exit(1);
}

const objectCode = match[1];

// Create a sandbox and evaluate the object safely
let gridData;
try {
  const sandbox = {};
  vm.createContext(sandbox);
  gridData = vm.runInContext(`(${objectCode})`, sandbox);
} catch (error) {
  console.error(
    "❌ Error evaluating GridData object:",
    error
  );
  process.exit(1);
}

// Write to JSON
fs.writeFileSync(
  outputJsonPath,
  JSON.stringify(gridData, null, 2)
);

console.log(
  `✅ GridData.json successfully created at: ${outputJsonPath}`
);
