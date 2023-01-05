import express from "express";
import AddProductToOrder from "../models/productOrdersModel";

const Order = new AddProductToOrder("orders");

const addProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const order_Id: string = req.params.id;
  const product_id: string = req.body.product_id;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await Order.addProduct(quantity, order_Id, product_id);
    res.json(addedProduct);
  } catch (error: unknown) {
    next(error);
  }
};

export default addProduct;
