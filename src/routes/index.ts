import { Router } from "express";
import userRoutes from "./api/users.route";
import productRoutes from "./api/products.route";
import orderRoutes from "./api/orders.route";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/orders", orderRoutes);

export default routes;
