module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [ "src/domains/Tasks/Service/TaskService.test" ],
};