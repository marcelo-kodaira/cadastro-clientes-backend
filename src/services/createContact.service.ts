import AppDataSource from "../data-source"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import AppError from "../Error/AppError"

const createContactService = async ({nome, email,senha:password, telefone}:ICreateRequest, id:string):Promise<IPerson> =>{


    const repositoryClients = AppDataSource.getRepository(Clients)
    const repositoryContacts = AppDataSource.getRepository(Contacts)

    const client = await repositoryClients.findOneBy({
        id
    })

    const emailAlreadyExists = await repositoryContacts.findOneBy({
        email
    })

    if(emailAlreadyExists){
        throw new AppError('Contato com este email ja cadastrado')
    }

    const contact = repositoryContacts.create({
        nome,
        email,
        telefone,
        clients: client!
    });
    await repositoryContacts.save(contact)

    const {clients, ...rest} = contact

    return rest

}

export default createContactService