import AppError from "../Error/AppError"
import AppDataSource from "../data-source"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"

const createContactService = async ({nome, email,senha:password, telefone}:ICreateRequest, repo: typeof Contacts | typeof Clients, id:string):Promise<IPerson> =>{


    const repositoryClients = AppDataSource.getRepository(Clients)
    const repositoryContacts = AppDataSource.getRepository(Contacts)

    const client = await repositoryClients.findOneBy({
        id
    })

    const contact = repositoryContacts.create({
        nome,
        email,
        telefone
    });
    await repositoryContacts.save(contact)

    client!.contacts.push(contact)
    repositoryClients.save(client!)

    return client!

}

export default createContactService