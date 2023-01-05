import Model from "../models/Model";
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";

type User = {
  id?: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const userOne = new Model("users");
const request = supertest(app);

const newUser = {
  first_name: "first",
  last_name: "last",
  password: "12345678",
};

const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string, {
  expiresIn: "30d",
});

let user: User;

describe("user Endpoint test", () => {
  it("should 'POST' /api/users - To create new user", async () => {
    const newUser = {
      first_name: "first",
      last_name: "last",
      email: "test@ae.sa",
      password: "123467890",
    };

    const response = await request.post("/api/users").send(newUser);
    user = response.body.information as User;
    expect(response.status).toBe(200);
  });

  it("should 'PATCH' /api/users/:id - To edit the created new user by id with a token added", async () => {
    const response = await request
      .patch(`/api/users/${user.id}`)
      .send(newUser)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/users/:id - to show the user by id with a token added", async () => {
    const response = await request.get(`/api/users/${user.id}`).set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/users - to show users with a token added", async () => {
    const response = await request.get("/api/users").set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'DELETE' /api/users/ - To delete user created by id with providing a token added", async () => {
    const response = await request
      .delete(`/api/users/${user.id}`)
      .send(newUser)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'DELETE' /api/users/ - error no token is added", async () => {
    const response = await request.delete(`/api/users/${user.id}`).send(newUser);
    expect(response.status).toBe(401);
  });
});
