import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson, IUpdateRequest } from "../interfaces/clients"
import AppError from "../Error/AppError"
import { hashSync } from "bcrypt"

const updateService = async ({email,nome,telefone, senha:password}:IUpdateRequest, repo: typeof Contacts | typeof Clients, clientId: string,id?:string ):Promise<IPerson> =>{

    const repositoryClients = AppDataSource.getRepository(Clients)
    const repositoryContacts = AppDataSource.getRepository(Contacts)

    const clientFound = await repositoryClients.findOneBy({
        id: clientId
    })

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
            id: id,
            clients: clientFound!
        })
        if(!contactRelated){
            throw new AppError('Você não pode alterar este contato', 403)
        }

        await repositoryContacts.update(id!,{
            email,
            nome,
            telefone,
        })
        const updatedContact = await repositoryContacts.findOneBy({id})
        return updatedContact!
    }

}
export default updateService