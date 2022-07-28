export default {
    clearMocks: true,
  
    collectCoverage: true,
    testPathIgnorePatterns: ["/dist/", "/build/"],
    coverageDirectory: "coverage",
    transform: {
      ".(ts|tsx)": "ts-jest",
    },
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    moduleFileExtensions: ["ts", "tsx", "js"],
  };