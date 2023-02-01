import { Router } from "express";
import { listController, updateController, deleteController, createClientController, loginController, listClientsContactsController } from "../controllers/controller";
import addRepositoryToRequest from "../middlewares/addRepository.middleware";
import authMiddleware from "../middlewares/auth.middleware";

const clientRoutes = Router()

clientRoutes.post("",addRepositoryToRequest,createClientController)
clientRoutes.post("/login",addRepositoryToRequest,loginController)
clientRoutes.get("",addRepositoryToRequest,listController) // lista todos os clientes
clientRoutes.get("/contacts",authMiddleware,listClientsContactsController) //lista todos os contatos do cliente
clientRoutes.patch("/:id",addRepositoryToRequest,updateController)
clientRoutes.delete("",authMiddleware,addRepositoryToRequest,deleteController)

export default clientRoutes