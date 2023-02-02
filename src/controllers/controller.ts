import { Request, Response } from "express"
import { ICreateRequest, ILogin, IUpdateRequest } from "../interfaces/clients"
import createClientService from "../services/createClient.service"
import createContactService from "../services/createContact.service"
import deleteService from "../services/delete.service"
import listService from "../services/list.service"
import listClientsContactsService from "../services/listClientsContacts.service"
import loginService from "../services/login.service"
import updateService from "../services/update.service"


const createClientController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const created = await createClientService(data)
    return res.status(201).json(created)
}

const createContactController = async (req: Request, res: Response) =>{

    const data:ICreateRequest = req.body
    const clientId = req.user.id
    const created = await createContactService(data,clientId)
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
    const clientId = req.user.id
    const id = req.params && req.params.id
    const updated = await updateService(data,repo, clientId, id)
    return res.status(200).json(updated)
}

const deleteController = async (req: Request, res: Response) =>{
    const clientId = req.user.id
    const repo = req.repository
    const id = req.params && req.params.id
    await deleteService(clientId,repo,id)
    return res.status(200).json('Usuário deletado com sucesso')
}

const loginController = async (req: Request, res: Response) =>{
    const credentials:ILogin = req.body
    const logged = await loginService(credentials)
    return res.status(200).json(logged)
}

const listClientsContactsController = async (req: Request, res: Response) =>{

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 5;
    const clientId = req.user.id
    const list = await listClientsContactsService(clientId, +page, +pageSize)
    
    let prev: string | null = `/api/clients/contacts?clientId=${clientId}&page=${+page - 1}&pageSize=${pageSize}`;
    if (page <= 1) {
        prev = null;
    }
  
    let next: string | null = `/api/clients/contacts?clientId=${clientId}&page=${+page + 1}&pageSize=${pageSize}`;
    if (list.length < pageSize) {
        next = null;
    }
  
    const response = {
        info: {
            page: +page,
            pageSize: +pageSize,
            prev,
            next
        },
        data: list
    };


    return res.status(200).json(response)
}


export {listController, createClientController,createContactController, updateController, deleteController, loginController, listClientsContactsController}