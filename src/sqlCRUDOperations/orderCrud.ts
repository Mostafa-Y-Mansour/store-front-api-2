import express from "express";
import Model from "../models/Model";
const Order = new Model("orders");

const create: express.RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const order = await Order.create(req.body);
    res.json({
      status: "success",
      info: { ...order },
      msg: `Your order with id ${order.id} is ready`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const index: express.RequestHandler = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const order = await Order.index();
    res.json({ status: "success", info: order, msg: "This is all orders" });
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;
    const specificOrder = await Order.show("id", req.params.id);
    if (!specificOrder) {
      throw new Error(`this order id:${id} does not exist`);
    }
    const order = await Order.show("id", req.params.id);
    res.json({ status: "success", info: order });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const id = req.params.id;
    const updated = await Order.update(id, req.body);
    if (!updated) {
      throw new Error(`this order id:${id} does not exist`);
    }
    const update = await Order.update(id, req.body);
    res.json({ status: "success", info: update, msg: "updated" });
  } catch (error: unknown) {
    next(error);
  }
};

const deleteOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id: string = req.params.id;
  try {
    const deleteOrder = await Order.delete(req.params.id as unknown as string);
    if (!deleteOrder) {
      throw new Error(`this order id:${id} does not exist`);
    }
    res.json({ status: "success", info: deleteOrder, msg: "Order Deleted" });
  } catch (error: unknown) {
    next(error);
  }
};

export { create, index, show, update, deleteOrder };
