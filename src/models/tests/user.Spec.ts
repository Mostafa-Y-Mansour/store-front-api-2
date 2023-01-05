import Model from "../Model";

type User = {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

describe("Test if the methods of the user model is working", () => {
  let user: User;

  const testUser = new Model("users");
  it("Test Create user", async () => {
    const result = await testUser.create({
      email: "test@ae.com",
      first_name: "first",
      last_name: "last",
      password: "123456789",
    });
    user = result;
    expect(result).toBeInstanceOf(Object);
  });

  it("Test index users", async () => {
    const result = await testUser.index();
    expect(result).toBeInstanceOf(Array);
  });

  it("Test show user", async () => {
    const result = await testUser.show("id", user.id);
    expect(result).toBeInstanceOf(Object);
  });

  it("Test update user", async () => {
    const result = await testUser.update("" + user.id, {
      email: "test@ae.com",
      first_name: "first",
      last_name: "last",
      password: "1234567890",
    });
    expect(result).toBeInstanceOf(Object);
  });

  it("Test delete user", async () => {
    const result = await testUser.delete(user.id as unknown as string);
    expect(result).toBeInstanceOf(Object);
  });
});
