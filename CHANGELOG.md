# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.13.1 - 2022-08-26

### Fixed
* Add mocks for private modules
* Report build errors

## 2.13.0 - 2021-11-09

### Added
* Support for `import.meta.url`

## 2.12.7 - 2021-02-18

### Changed
* Add core-js to jest setup
* Add regenerator-runtime jest setup

## 2.12.6 - 2021-02-18

### Fixed
* Revert dependency to @scm-manager/babel-preset, because it breaks async await

## 2.12.5 - 2021-02-17

### Fixed
* Missing dependency to @scm-manager/babel-preset

## 2.12.4 - 2021-01-14

### Changed
* Use name in coverage directory for non plugin modules

## 2.12.3 - 2020-12-16

### Changed
* Use fixed directory for coverage report

## 2.12.2 - 2020-12-16

### Fixed
* Collection of code coverage

## 2.12.1 - 2020-12-10

### Fixed
* Babel transformation
* Execution of WorkerMock methods

## 2.12.0 - 2020-12-10

### Added
* Support for gradle based plugin builds

### Changed
* Collect coverage only on ci builds
