import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson, IUpdateRequest } from "../interfaces/clients"
import AppError from "../Error"

const updateService = async ({email,nome,telefone}:IUpdateRequest, repo: typeof Contacts | typeof Clients, id:string ):Promise<IPerson> =>{

    const repository = AppDataSource.getRepository(repo)

    const userFound = await repository.findOneBy({id})

    if(!userFound){
        throw new AppError('Usuário não encontrado')
    }

    const updated = await repository.update(id,{
        email,
        nome,
        telefone
    })

    const updatedUser = await repository.findOneBy({id})


    return updatedUser!

}
export default updateService