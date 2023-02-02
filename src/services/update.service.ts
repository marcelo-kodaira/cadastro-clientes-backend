import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson, IUpdateRequest } from "../interfaces/clients"
import AppError from "../Error/AppError"
import { hashSync } from "bcrypt"

const updateService = async ({email,nome,telefone, senha:password}:IUpdateRequest, repo: typeof Contacts | typeof Clients, clientId: string, contactId?:string ):Promise<IPerson> =>{

    const repositoryClients = AppDataSource.getRepository(Clients)
    const repositoryContacts = AppDataSource.getRepository(Contacts)

    if(repo === Clients){
        await repositoryClients.update(
            clientId,{
            nome,
            email,
            senha: password && hashSync(password, 10),
            telefone
        })
        const updatedClient = await repositoryClients.findOneBy({
            id: clientId
        })
        const {senha, ...rest} = updatedClient!;
        return rest
    }else{
        const contactRelated = await repositoryContacts.findOneBy({
            id: contactId,
            clients: {
                id: clientId
            }
        })

        if(!contactRelated){
            throw new AppError('Contato não encontrado ou você não pode alterar este contato', 403)
        }

        await repositoryContacts.update(contactId!,{
            email,
            nome,
            telefone,
        })

        const updatedContact = await repositoryContacts.findOneBy({id: contactId})
        
        return updatedContact!
    }

}
export default updateService