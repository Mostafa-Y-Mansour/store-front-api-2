import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("test root endpoint for the server", () => {
  it("test the / endpoint to response with status 200 ok", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
