import dotenv from "dotenv";
dotenv.config();

import outputComponentsAsSvg from "@figma-export/output-components-as-svg";
import outputComponentsAsSvgr from "@figma-export/output-components-as-svgr";
import svgo from "@figma-export/transform-svg-with-svgo";

/** @type {import('svgo').PluginConfig[]} */
const solidSVGOConfig = [
  { removeDimensions: true },
  { sortAttrs: true },
  { removeAttrs: { attrs: "fill" } },
  { addAttributesToSVGElement: { attribute: { fill: "currentColor" } } },
];

/** @type {import('svgo').PluginConfig[]} */
const outlineSVGOConfig = [
  { removeDimensions: true },
  { sortAttrs: true },
  { removeAttrs: { attrs: "stroke" } },
  { addAttributesToSVGElement: { attribute: { stroke: "currentColor" } } },
];

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const fileId = process.env.FILE_ID;

const outputters = [
  outputComponentsAsSvg({ output: "./" }),
  outputComponentsAsSvgr({
    output: "./src",
    getFileExtension: () => ".tsx",
    getComponentName: ({ componentName, pageName }) =>
      `${componentName}${capitalize(pageName)}`,
    getSvgrConfig: () => ({
      typescript: true,
      icon: true, // optional: makes the SVG scale with text size
    }),
  }),
];

/** @type {import('@figma-export/types').FigmaExportRC} */
const config = {
  commands: [
    [
      "components",
      {
        fileId,
        onlyFromPages: ["Solid"],
        outputters: [...outputters, outputComponentsAsSvg({ output: "./" })],
        transformers: [svgo({ multipass: true, plugins: solidSVGOConfig })],
      },
    ],
    [
      "components",
      {
        fileId,
        onlyFromPages: ["Outline"],
        outputters: [...outputters, outputComponentsAsSvg({ output: "./" })],
        transformers: [svgo({ multipass: true, plugins: outlineSVGOConfig })],
      },
    ],
  ],
};

export default config;
