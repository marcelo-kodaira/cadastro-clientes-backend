import { Router } from "express";
import { listController, updateController, deleteController, createClientController, loginController } from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";

const clientRoutes = Router()

clientRoutes.post("",addRepositoryToRequest,createClientController)
clientRoutes.post("/login",addRepositoryToRequest,loginController)
clientRoutes.get("",addRepositoryToRequest,listController)
clientRoutes.patch("/:id",addRepositoryToRequest,updateController)
clientRoutes.delete("/:id",addRepositoryToRequest,deleteController)

export default clientRoutes