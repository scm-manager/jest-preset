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

const path = require("path");
const isCI = require("is-ci");

const mockDirectory = path.resolve(__dirname, "src", "__mocks__");
const findName = require("./src/findName");
const findTarget = require("./src/findTarget");
const isPlugin = require("./src/isPlugin");

// Set timezone for tests, this is required to get same date values
// accross diferent machines such ci-server and dev box.
// We have to set the timezone as soon as possible, because Date will
// cache the value.
// @see https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config
process.env.TZ = "Europe/Berlin";

const root = process.cwd();
const name = findName(root);
const target = findTarget(root);
const reportDirectory = path.join(target, "jest-reports");
const coverageDirectory = isPlugin(name) ? "coverage" : `coverage-${name}`;

const moduleNameMapper = {
  "\\.(png|svg|jpg|gif|woff2?|eot|ttf)$": path.join(mockDirectory, "fileMock.js"),
  "\\.(css|scss|sass)$": path.join(mockDirectory, "styleMock.js"),
  "@scm-manager/ui-styles": path.join(mockDirectory, "ui-styles.js")
};

// some of the snapshot tests are using the ui-text and ui-syntaxhighlighting components
// so we enable the mocks only for plugins
if (isPlugin(name)) {
  moduleNameMapper["@scm-manager/ui-text"] = path.join(mockDirectory, "ui-text.js");
  moduleNameMapper["@scm-manager/ui-syntaxhighlighting"] = path.join(mockDirectory, "ui-syntaxhighlighting.js");
  moduleNameMapper["@scm-manager/ui-shortcuts"] = path.join(mockDirectory, "ui-shortcuts.js");
}

module.exports = {
  rootDir: root,
  roots: [root],
  testPathDirs: [path.join(root, "src")],
  transform: {
    "^.+\\.(ts|tsx|js)$": "@scm-manager/jest-preset"
  },
  transformIgnorePatterns: ["node_modules/(?!(@scm-manager)/)"],
  moduleNameMapper,
  setupFiles: [path.resolve(__dirname, "src", "setup.js")],
  collectCoverage: isCI,
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!<rootDir>/node_modules/"],
  coverageDirectory: path.join(reportDirectory, coverageDirectory),
  coveragePathIgnorePatterns: ["src/tests/.*", "src/testing/.*"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: `${name} tests`,
        outputDirectory: reportDirectory,
        outputName: `TEST-${name}.xml`,
        reportTestSuiteErrors: true
      }
    ]
  ]
};
