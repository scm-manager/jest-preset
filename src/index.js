/*
 * Copyright (c) 2020 - present Cloudogu GmbH
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see https://www.gnu.org/licenses/.
 */

const babelJest = require("babel-jest");

const transformer = babelJest.createTransformer({
  presets: ["@scm-manager/babel-preset"],
  plugins: ["require-context-hook", "babel-plugin-transform-import-meta"],
  babelrc: false,
  configFile: false
});

module.exports = {
  ...transformer,
  process(src, filename, transformOptions, ...rest) {
    if (!filename.includes("node_modules") || filename.includes("@scm-manager")) {
      return transformer.process(src, filename, transformOptions, ...rest);
    }
    return src;
  }
};
