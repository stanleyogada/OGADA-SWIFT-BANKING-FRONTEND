let datNowSpy: jest.SpyInstance;
const MOCK_DATE_VALUE = "2021-06-01T00:00:00.000Z";

beforeEach(() => {
  datNowSpy = jest.spyOn(Date, "now").mockImplementation(() => new Date(MOCK_DATE_VALUE).getTime());
});

afterEach(() => {
  datNowSpy.mockRestore();
});

export { MOCK_DATE_VALUE };
