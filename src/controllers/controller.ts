import { Request, Response } from "express"
import { ICreateRequest, IUpdateRequest } from "../interfaces/clients"
import createService from "../services/createContact.service"
import deleteService from "../services/deleteContact.service"
import listService from "../services/listContacts.service"
import updateService from "../services/updateContact.service"


const createController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const repo = req.repository
    const created = createService(data,repo)
    return res.status(201).send(created)
}


const listController = async (req: Request, res: Response) =>{
    const repo = req.repository
    const list = await listService(repo)
    return res.status(200).send(list)
}

const updateController = async (req: Request, res: Response) =>{
    const data:IUpdateRequest = req.body
    const repo = req.repository
    const {id} = req.params
    const updated = await updateService(data,repo,id)
    return res.status(200).send(updated)
}

const deleteController = async (req: Request, res: Response) =>{
    const {id} = req.params
    const repo = req.repository
    await deleteService(id,repo)
    return res.status(204).send('Usuário deletado com sucesso')
}


export {listController, createController, updateController, deleteController}