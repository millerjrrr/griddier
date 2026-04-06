import colors from "./colors";
import getAppDimensions from "./appDimensions";

const { base, textBase } = getAppDimensions();

export const typography = {
  // ===== CORE =====
  title: {
    fontSize: 20 * textBase,
    fontWeight: "600",
    color: colors.C1,
  },
  body: {
    fontSize: 16 * textBase,
    fontWeight: "400",
    color: colors.C1,
  },
  caption: {
    fontSize: 12 * textBase,
    fontWeight: "300",
    color: colors.C1,
  },

  // ===== MODAL =====
  modalTitle: {
    fontSize: 35 * textBase,
    fontWeight: "bold",
    color: colors.C2,
    textAlign: "center",
    paddingBottom: 5 * base,
  },
  modalText: {
    fontSize: 25 * textBase,
    color: colors.C2,
    textAlign: "center",
    padding: 8 * base,
  },
  modalSmallText: {
    fontSize: 20 * textBase,
    color: colors.C2,
    paddingBottom: 15 * base,
  },

  // ===== ACTION BUTTONS =====
  actionButton: {
    fontSize: 25 * textBase,
    fontWeight: "bold",
    color: colors.C4,
    textAlign: "center",
  },
  actionButtonSmall: {
    fontSize: 15 * textBase,
    fontWeight: "bold",
    color: colors.C4,
    textAlign: "center",
  },

  // ===== GRID =====
  gridCell: {
    fontWeight: "bold",
    color: colors.C2,
  },
  gridCellSub: {
    fontSize: 10 * textBase,
    fontWeight: "bold",
    color: colors.C4,
  },
  featuredGrid: {
    fontSize: 12 * textBase,
    fontWeight: "bold",
    color: colors.C1,
  },

  // ===== RANGE / POKER =====
  rangeCardTitle: {
    fontWeight: "bold",
    color: colors.C1,
  },
  betTag: {
    fontSize: 20 * textBase,
    color: colors.C1,
    paddingRight: 5 * base,
  },
  stackSizeTag: {
    fontSize: 15 * textBase,
    fontWeight: "bold",
    color: colors.C1,
    textAlign: "center",
  },

  // ===== INFO / HELP =====
  info: {
    fontSize: 12 * textBase,
    paddingLeft: 5 * base,
    marginTop: 5 * base,
    marginRight: 10 * base,
    color: colors.C1,
  },
  instruction: {
    fontSize: 18 * textBase,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 15 * base,
    color: colors.C1,
  },

  // ===== MISC =====
  clock: {
    fontSize: 20 * textBase,
    paddingLeft: 5 * base,
    color: colors.C1,
  },
  frequencyBar: {
    fontSize: 18 * textBase,
    color: colors.C2,
  },
  frequencyBarCombos: {
    fontSize: 10 * textBase,
    color: colors.C2,
  },

  settingsCard: {
    fontSize: 25 * textBase,
    color: colors.C1,
  },
} as const;
