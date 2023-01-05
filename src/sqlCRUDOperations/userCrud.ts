import express from "express";
import userModel from "../models/userModel";

const User = new userModel("users");

const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const hashedPassword = await User.hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await User.create(req.body);
    if (!user) {
      throw new Error("you did not enter all files");
    }

    res.json({
      status: "success",
      info: { ...user },
      msg: `Hello ${user.first_name} your id is id:${user.id}`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const index = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await User.index();
    res.json({
      status: "success",
      info: users,
      msg: `the users number is ${users.length}`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id: string = req.params.id;
    const user = await User.show("id", req.params.id);
    if (!user) {
      throw new Error(`this order id:${id} does not exist`);
    }
    res.json({
      status: "success",
      info: user,
      msg: `here you got user with id:${user.id}`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id: string = req.params.id;
  try {
    const update = await User.update(id, req.body);
    if (!update) {
      throw new Error(`this order id:${id} does not exist`);
    }
    res.json({
      status: "success",
      info: update,
      msg: `user id:${id} has changed the information`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const id: string = req.params.id;
    const deleteUser = await User.delete(req.params.id as unknown as string);
    if (!deleteUser) {
      throw new Error(`this order id:${id} does not exist`);
    }
    res.json({
      status: "success",
      info: deleteUser,
      msg: `user with id:${id} not here anymore  'deleted'`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export { create, show, index, update, deleteUser };
