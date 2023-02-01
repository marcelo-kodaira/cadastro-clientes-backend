import { Router } from "express";
import { listController, updateController, deleteController, createContactController, loginController } from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const contactsRoutes = Router()

contactsRoutes.post("",authMiddleware,addRepositoryToRequest,createContactController)
contactsRoutes.get("",addRepositoryToRequest,listController)
contactsRoutes.patch("/:id",addRepositoryToRequest,updateController)
contactsRoutes.delete("/:id",addRepositoryToRequest,deleteController)

export default contactsRoutes