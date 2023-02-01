import { Router } from "express";
import { listController, updateController, deleteController, createController, loginController } from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";

const contactsRoutes = Router()

contactsRoutes.post("",addRepositoryToRequest,createController)
contactsRoutes.post("/login",addRepositoryToRequest,loginController)
contactsRoutes.get("",addRepositoryToRequest,listController)
contactsRoutes.patch("/:id",addRepositoryToRequest,updateController)
contactsRoutes.delete("/:id",addRepositoryToRequest,deleteController)

export default contactsRoutes