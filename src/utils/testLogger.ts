import { TEST_LOG_PREFIX } from "@constants/index";

const testLogger = (...rest: any[]) => {
  if (process.env.NODE_ENV === "test") {
    console.info(TEST_LOG_PREFIX, ...rest);
  }
};

export default testLogger;
