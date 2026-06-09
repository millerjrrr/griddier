// metro.config.js

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  "@src": path.resolve(__dirname, "src"),
  "@assets": path.resolve(__dirname, "assets"),
  "@components": path.resolve(__dirname, "src/components"),
  "@types": path.resolve(__dirname, "src/types"),
  "@utils": path.resolve(__dirname, "src/utils"),
};

module.exports = config;
