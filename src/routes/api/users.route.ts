import { Router } from "express";
import login from "../../sqlCRUDOperations/auth";
import { create, show, index, update, deleteUser } from "../../sqlCRUDOperations/userCrud";
import authenticate from "../../handlers/authHandler";

const routes = Router();

routes.route("/").get(authenticate, index).post(create);
routes
  .route("/:id")
  .get(authenticate, show)
  .patch(authenticate, update)
  .delete(authenticate, deleteUser);

routes.route("/auth").post(login);
export default routes;
