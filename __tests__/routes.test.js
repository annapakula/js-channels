const request = require("supertest");
const server = require("../server/start");
const data = require('../static/channels.json');

beforeAll(async () => {
  console.log("Jest starting");
});

afterAll(() => {
  server.close();
  console.log("server closed");
});

describe("route tests", () => {
  test("get JS channels GET /channels", async () => {
    const response = await request(server).get("/channels");
    expect(response.status).toEqual(200);
    expect(JSON.parse(response.text)).toEqual(data);
  });
});
