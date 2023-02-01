import { Router } from "express";
import { listController, updateController, deleteController, createContactController} from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const contactsRoutes = Router()

contactsRoutes.post("",authMiddleware,addRepositoryToRequest,createContactController)
contactsRoutes.get("/all",addRepositoryToRequest,listController) //lista todos os contatos registrados no db
contactsRoutes.patch("/:id",authMiddleware,addRepositoryToRequest,updateController)
contactsRoutes.delete("/:id",authMiddleware,addRepositoryToRequest,deleteController)

export default contactsRoutes