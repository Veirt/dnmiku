// @ts-nocheck
// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true,
  },
  projects: [
    "./client",
    {
      root: "./client",
      package: "./package.json",
      tsconfig: "./tsconfig.json",
    },
  ],
};
