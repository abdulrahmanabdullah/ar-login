import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";
const packageJson = require("./package.json");

export default {
  input: "src/index.js",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    PeerDepsExternalPlugin(),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    json(),
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    terser(),
  ],
};
// {
//   input: "dist/esm/index.d.js",
//   output: [{ file: "dist/index.d.js", format: "esm" }],
//   // plugins: [dts()],
// },
