module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.js'], // Change the glob pattern to match your project files
    coverageReporters: ['lcov', 'text', 'clover'],
  };