import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvaliableCarsController } from "@modules/cars/useCases/listAvaliableCars/ListAvaliableCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvaliableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
