import { Router } from "express";
import { create, index, show, update, deleteOrder } from "../../sqlCRUDOperations/orderCrud";
import addProduct from "../../sqlCRUDOperations/orderProductsCrud";
import authenticate from "../../handlers/authHandler";

const routes = Router();

routes.route("/").get(authenticate, index).post(authenticate, create);
routes
  .route("/:id")
  .get(authenticate, show)
  .patch(authenticate, update)
  .delete(authenticate, deleteOrder);

routes.route("/:id/products").post(authenticate, addProduct);
export default routes;
