import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson, IUpdateRequest } from "../interfaces/clients"
import AppError from "../Error/AppError"
import { hashSync } from "bcrypt"

const updateService = async ({email,nome,telefone, senha:password}:IUpdateRequest, repo: typeof Contacts | typeof Clients, id:string, clientId: string ):Promise<IPerson> =>{

    const repositoryClients = AppDataSource.getRepository(Clients)
    const repositoryContacts = AppDataSource.getRepository(Contacts)
    const repository = AppDataSource.getRepository(repo)

    const clientFound = await repositoryClients.findOneBy({
        id: clientId
    })

    if(repo === Clients){
        await repositoryClients.update(
            id,{
            nome,
            email,
            senha: password && hashSync(password, 10),
            telefone
        })
    }else{
        const contactRelated = await repositoryContacts.findOneBy({
            clients: clientFound!
        })
        if(!contactRelated){
            throw new AppError('Você não pode alterar este contato', 403)
        }

        await repositoryContacts.update(id,{
            email,
            nome,
            telefone,
        })
    }

    const updatedUser = await repository.findOneBy({id})

    if ("senha" in updatedUser!) {
        const {senha, ...rest} = updatedUser;
        return rest
    }

    return updatedUser!

}
export default updateService