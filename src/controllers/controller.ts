import { Request, Response } from "express"
import { ICreateRequest, IUpdateRequest } from "../interfaces/clients"
import createService from "../services/createContact.service"
import deleteService from "../services/deleteContact.service"
import listService from "../services/listContacts.service"
import updateService from "../services/updateContact.service"


const createController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const repo = req.repository
    const created = await createService(data,repo)
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


export {listController, createController, updateController, deleteController}