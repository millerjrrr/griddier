import { createCanvas } from "canvas";
import type { CanvasRenderingContext2D } from "canvas";

import fs from "fs";
import path from "path";

import { getRange } from "../src/utils/getRange";
import { handsArray } from "../src/utils/handsArrayLogic";
import colors from "../src/utils/colors";
import {
  OrderedKey,
  OrderedKeys,
} from "./../assets/data/OrderedKeys";
import { RangeIdMap } from "./../assets/data/RangeIdMap";

const MARGIN = 5;
const CELL_SIZE = 120;
const GRID_DIM = 13;
const GRID_SIZE =
  CELL_SIZE * GRID_DIM + MARGIN * (GRID_DIM - 1);

const OUTPUT_DIR = path.join(
  __dirname,
  "../assets/img/generatedGrids",
);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  actions: any,
  hand: string,
) {
  const {
    allin = 0,
    raise = 0,
    call = 0,
    prior = 4,
  } = actions;

  const opacity = "ff";

  const { ALLIN, RAISE, CALL, PRIOR, FOLD } = colors;

  // 1️⃣ Base background
  ctx.fillStyle = PRIOR + opacity;
  ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

  // 2️⃣ Segments height based on prior
  const segmentHeight = (prior / 4) * CELL_SIZE;

  const segments = [
    { value: allin, color: ALLIN + opacity },
    { value: raise, color: RAISE + opacity },
    { value: call, color: CALL + opacity },
    {
      value: 4 - allin - raise - call,
      color: FOLD + opacity,
    },
  ];

  let currentX = x;

  for (const seg of segments) {
    const width = (seg.value / 4) * CELL_SIZE;

    ctx.fillStyle = seg.color;
    ctx.fillRect(
      currentX,
      y + CELL_SIZE - segmentHeight,
      width,
      segmentHeight,
    );

    currentX += width;
  }

  // 3️⃣ Border
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);

  // 4️⃣ Hand Text
  ctx.fillStyle = "#000";
  ctx.font = `bold ${CELL_SIZE * 0.4}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(hand, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
}

function generateGrid(name: OrderedKey) {
  const canvas = createCanvas(GRID_SIZE, GRID_SIZE);
  const ctx = canvas.getContext("2d");

  const range = getRange(name);
  const hands = range.hands;

  for (let row = 0; row < GRID_DIM; row++) {
    for (let col = 0; col < GRID_DIM; col++) {
      const index = row * GRID_DIM + col;
      const hand = handsArray[index];
      const actions = hands[hand];

      const x = col * (CELL_SIZE + MARGIN);

      const y = row * (CELL_SIZE + MARGIN);

      drawCell(ctx, x, y, actions, hand);
    }
  }

  const rangeId = RangeIdMap[name];

  const filePath = path.join(OUTPUT_DIR, `${rangeId}.png`);

  const buffer = canvas.toBuffer("image/png");

  fs.writeFileSync(filePath, buffer);

  console.log(`Generated ${filePath}`);
}

const IMAGE_MAP_OUTPUT = path.join(
  __dirname,
  "../assets/data/rangeImageMap.ts",
);

function generateImageMapFile() {
  const lines: string[] = [];

  lines.push(`import { RangeId } from "./RangeIdMap";`);
  lines.push("");
  lines.push(
    "export const RangeImages: Record<RangeId, any> = {",
  );

  OrderedKeys.forEach((key) => {
    const id = RangeIdMap[key];

    lines.push(
      `  "${id}": require("@assets/img/generatedGrids/${id}.png"),`,
    );
  });

  lines.push("};");
  lines.push("");

  fs.writeFileSync(IMAGE_MAP_OUTPUT, lines.join("\n"));

  console.log("Generated rangeImages.ts");
}

const grids = OrderedKeys.slice(0, 250);

grids.forEach(generateGrid);

// generateImageMapFile();

console.log("All grids generated.");
