import { Router } from "express";
import { listController, updateController, deleteController, createController } from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";

const contactsRoutes = Router()

contactsRoutes.post("",addRepositoryToRequest,createController)
contactsRoutes.get("",addRepositoryToRequest,listController)
contactsRoutes.patch("/:id",addRepositoryToRequest,updateController)
contactsRoutes.delete("/:id",addRepositoryToRequest,deleteController)

export default contactsRoutes