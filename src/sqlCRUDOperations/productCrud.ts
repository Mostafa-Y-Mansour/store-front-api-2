import express from "express";
import Model from "../models/Model";

const Product = new Model("products");

const create: express.RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      status: "success",
      info: { ...product },
      msg: `you have add new Product:${product.name} with id:${product.id}`,
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
    const product = await Product.index();
    res.json({
      status: "success",
      info: product,
      msg: `you have ${product.length} products`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id: string = req.params.id;
  try {
    const product = await Product.show("id", req.params.id);
    if (!product) {
      throw new Error(`this order id:${id} does not exist`);
    }
    res.json({
      status: "success",
      info: product,
      msg: `your product name is:${product.name}`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id: string = req.params.id;
  try {
    const update = await Product.update(id, req.body);
    if (!update) {
      throw new Error(`This product by id:${id} is not exist to update it`);
    }
    res.json({
      status: "success",
      info: update,
      msg: `the product information for ${update.name} has changed`,
    });
  } catch (error: unknown) {
    next(error);
  }
};

const deleteProduct = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const deleteProduct = await Product.delete(req.params.id as unknown as string);
    res.json({
      status: "success",
      info: deleteProduct,
      msg: `this product:${deleteProduct.name} is deleted`,
    });
  } catch (error: unknown) {
    next(error);
  }
};
export { create, show, index, update, deleteProduct };
