const request = require("supertest");
const app = require("../src/app");

describe("Test Root", () => {
  test("GET root returns 200 and text", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe("Worldly Hellos");
  });
});

describe("Smoke Test", () => {
  test("GET root returns 200 and text", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe("Worldly Hellos");
  });
});
