import Model from "../Model";

type Order = {
  id?: number;
  status: string;
  user_id: number;
};

type User = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

describe("Test the methods in order modules", () => {
  let order: Order;
  let user: User;

  const testOrders = new Model("orders");
  const testUsers = new Model("users");

  it("Test Create Order", async () => {
    const firstResult = await testUsers.create({
      email: "test@ae.sa",
      first_name: "first",
      last_name: "last",
      password: "123456789",
    });
    order = firstResult;
    const result = await testOrders.create({
      status: "online",
      user_id: firstResult.id,
    });
    order = result;
    expect(result).toBeInstanceOf(Object);
  });

  it("Test show Order", async () => {
    const result = await testOrders.show("id", order.id);
    expect(result).toBeInstanceOf(Object);
  });

  it("Test index Orders", async () => {
    const result = await testOrders.index();
    expect(result).toBeInstanceOf(Array);
  });

  it("Test update Order for a specific user", async () => {
    const firstResult = await testUsers.create({
      email: "test@ae.sa",
      first_name: "first",
      last_name: "last",
      password: "123456789",
    });
    user = firstResult;
    const result = await testOrders.update("" + order.id, {
      status: "online",
      user_id: firstResult.id,
    });
    expect(result).toBeInstanceOf(Object);
  });

  it("Test deleteOne Method", async () => {
    const result = await testOrders.delete(order.id as unknown as string);
    expect(result).toBeInstanceOf(Object);
  });
});
