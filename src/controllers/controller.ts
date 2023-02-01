import { Request, Response } from "express"
import { ICreateRequest, ILogin, IUpdateRequest } from "../interfaces/clients"
import createClientService from "../services/createClient.service"
import createContactService from "../services/createContact.service"
import deleteService from "../services/delete.service"
import listService from "../services/list.service"
import loginService from "../services/login.service"
import updateService from "../services/update.service"


const createClientController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const created = await createClientService(data)
    return res.status(201).json(created)
}

const createContactController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const repo = req.repository
    const clientId = req.user.id
    const created = await createContactService(data,repo,clientId)
    return res.status(201).json(created)
}


const listController = async (req: Request, res: Response) =>{
    const repo = req.repository
    const list = await listService(repo)
    return res.status(200).json(list)
}

const updateController = async (req: Request, res: Response) =>{
    const data:IUpdateRequest = req.body
    const repo = req.repository
    const {id} = req.params
    const updated = await updateService(data,repo,id)
    return res.status(200).json(updated)
}

const deleteController = async (req: Request, res: Response) =>{
    const {id} = req.params
    const repo = req.repository
    await deleteService(id,repo)
    return res.status(200).json('Usuário deletado com sucesso')
}

const loginController = async (req: Request, res: Response) =>{
    const credentials:ILogin = req.body
    const repo = req.repository
    const logged = await loginService(credentials)
    return res.status(200).json(logged)
}


export {listController, createClientController,createContactController, updateController, deleteController, loginController}