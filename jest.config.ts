module.exports = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "./src/utils/test/mocks.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "@/pages/(.*)": "<rootDir>/src/pages/$1",
    "@/components/(.*)": "<rootDir>/src/components/$1",
    "@/icons/(.*)": "<rootDir>/src/icons/$1",
  },
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
