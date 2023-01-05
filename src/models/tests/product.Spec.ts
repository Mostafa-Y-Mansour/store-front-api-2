import Model from "../Model";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

describe("Test if the methods of the products model is working", () => {
  let product: Product;

  const testProduct = new Model("products");
  it("Test Create Product", async () => {
    const result = await testProduct.create({
      name: "testProduct",
      price: 12314,
      category: "tes1tCategory",
    });
    product = result;
    expect(result).toBeInstanceOf(Object);
  });

  it("Test index Users", async () => {
    const result = await testProduct.index();
    expect(result).toBeInstanceOf(Array);
  });

  it("Test show Product", async () => {
    const result = await testProduct.show("id", product.id);
    expect(result).toBeInstanceOf(Object);
  });

  it("Test update Product", async () => {
    const result = await testProduct.update("" + product.id, {
      name: "testProduct",
      price: 12314,
      category: "tes1tCategory",
    });
    expect(result).toBeInstanceOf(Object);
  });

  it("Test delete", async () => {
    const result = await testProduct.delete(product.id as unknown as string);
    expect(result).toBeInstanceOf(Object);
  });
});
