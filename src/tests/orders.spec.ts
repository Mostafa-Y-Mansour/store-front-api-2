import Model from "../models/Model";
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

type Order = {
  id?: number | undefined;
  status: string;
  user_id: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type User = {
  id?: number | undefined;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const orderOne = new Model("orders");
const userOne = new userModel("users");
const productOne = new Model("products");
const request = supertest(app);
const newOrder = {
  status: "available || not available",
  user_id: 1,
};

const token = jwt.sign(newOrder, process.env.TOKEN_SECRET as string, {
  expiresIn: "30d",
});

let order: Order;
let product: Product;
let user: User;

describe("order endpoint test", () => {
  beforeAll(async () => {
    user = await userOne.create({
      first_name: "first",
      last_name: "last",
      email: "test@ae.sa",
      password: "123467890",
    });
    product = await productOne.create({
      name: "productBeta",
      price: 4000,
      category: "something",
    });
  });

  it("should 'POST' /api/orders - To create order with a token added", async () => {
    const newOrder = {
      status: "available",
      user_id: user.id,
    };

    const response = await request
      .post("/api/orders")
      .send(newOrder)
      .set("Cookie", [`token=${token}`]);
    order = response.body.information;
    expect(response.status).toBe(200);
  });

  it("should 'PATCH' /api/orders/:id - To edit order by id with a token added", async () => {
    const response = await request
      .patch(`/api/orders/${order.id}`)
      .send(newOrder)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/orders/:id - to show order by id with a token added", async () => {
    const response = await request.get(`/api/orders/${order.id}`).set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/orders - to show orders with a token added", async () => {
    const response = await request.get("/api/orders").set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'DELETE' /api/orders/:id - To delete order by id with a token added", async () => {
    const response = await request
      .delete(`/api/orders/${order.id}`)
      .send(newOrder)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'DELETE' /api/orders/:id - send error no token is added ", async () => {
    const response = await request.patch(`/api/orders/${order.id}`).send(newOrder);
    expect(response.status).toBe(401);
  });
});

let orderProduct: Order;

describe("orders-product - Endpoint test", () => {
  it("should 'POST' /api/orders - To create new order with a token", async () => {
    const newOrder = {
      status: "active",
      user_id: user.id,
    };
    const response = await request
      .post("/api/orders")
      .send(newOrder)
      .set("Cookie", [`token=${token}`]);
    orderProduct = response.body.information;
    expect(response.status).toBe(200);
  });

  it("should 'POST' /api/orders/:id/products - with a token ", async () => {
    const information = {
      product_id: product.id,
      quantity: "10",
    };
    const response = await request
      .post(`/api/orders/${orderProduct.id}/products`)
      .send(information)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'POST' /api/orders/:id/products - error no token is added", async () => {
    const information = {
      product_id: product.id,
      quantity: "10",
    };
    const response = await request
      .post(`/api/orders/${orderProduct.id}/products`)
      .send(information);
    expect(response.status).toBe(401);
  });
});
