const data = require("../../../static/channels.json");
const utils = require("./utils");

describe("sort data", () => {
  test("sort JS channels by title", () => {
    expect(utils.sortElements(data, "title")).toEqual(data.sort((a,b) => a.title.localeCompare(b.title)));
  });
  test("sort JS channels by subscribers", () => {
    expect(utils.sortElements(data, "subscribers")).toEqual(data.sort((a,b) => utils.digitsFromString(a.statistics.subscriberCount) - utils.digitsFromString(b.statistics.subscriberCount)));
  });
  test("sort JS channels by videos", () => {
    expect(utils.sortElements(data, "videos")).toEqual(data.sort((a,b) => utils.digitsFromString(a.statistics.videoCount) - utils.digitsFromString(b.statistics.videoCount)));
  });
  test("sort JS channels by views", () => {
    expect(utils.sortElements(data, "views")).toEqual(data.sort((a,b) => utils.digitsFromString(a.statistics.viewCount) - utils.digitsFromString(b.statistics.viewCount)));
  });
  test("get not sorted data if sorting parameter does not exists", () => {
    expect(utils.sortElements(data, "")).toEqual(data);
  });
});
