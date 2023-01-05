import Model from "../models/Model";
import supertest from "supertest";
import app from "../server";
import jwt from "jsonwebtoken";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

const productOne = new Model("products");
const request = supertest(app);

const newProduct = {
  name: "product",
  price: 4000,
  category: "something",
};

const token = jwt.sign(newProduct, process.env.TOKEN_SECRET as string, {
  expiresIn: "30d",
});

let product: Product;

describe("product Endpoint test", () => {
  it("should 'POST' /api/products - To create product with a token add", async () => {
    const response = await request
      .post("/api/products")
      .send(newProduct)
      .set("Cookie", [`token=${token}`]);
    product = response.body.information;
    expect(response.status).toBe(200);
  });

  it("should 'PATCH' /api/products/:id - To edit Product by id with a token added", async () => {
    const response = await request
      .patch(`/api/products/${product.id}`)
      .send(newProduct)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/products/:id - to show the product by id", async () => {
    const response = await request.get(`/api/products/${product.id}`);
    expect(response.status).toBe(200);
  });

  it("should 'GET' /api/products - to show products", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(200);
  });

  it("should 'DELETE' /api/products/ - To delete product by id with a token added", async () => {
    const response = await request
      .delete(`/api/products/${product.id}`)
      .send(newProduct)
      .set("Cookie", [`token=${token}`]);
    expect(response.status).toBe(200);
  });
});
