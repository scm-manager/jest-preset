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
const fs = require("fs");

function findName(directory) {
  const packageJSON = JSON.parse(fs.readFileSync(path.join(directory, "package.json"), { encoding: "UTF-8" }));

  const { name } = packageJSON;
  const orgaIndex = name.indexOf("/");
  if (orgaIndex > 0) {
    return name.substring(orgaIndex + 1);
  }
  return name;
}

module.exports = findName;
