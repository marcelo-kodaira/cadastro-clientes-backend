import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson } from "../interfaces/clients"

const listService = async (repo: typeof Contacts | typeof Clients):Promise<IPerson[]> =>{
    
    const repository = AppDataSource.getRepository(repo)
    const list = await repository.find()
    return list
}

export default listService