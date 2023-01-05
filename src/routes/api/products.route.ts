import { Router } from "express";
import { create, show, index, update, deleteProduct } from "../../sqlCRUDOperations/productCrud";
import authenticate from "../../handlers/authHandler";

const routes = Router();

routes.route("/").get(index).post(authenticate, create);
routes.route("/:id").get(show).patch(authenticate, update).delete(authenticate, deleteProduct);

export default routes;
