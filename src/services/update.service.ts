import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { IPerson, IUpdateRequest } from "../interfaces/clients"
import AppError from "../Error/AppError"
import { hashSync } from "bcrypt"

const updateService = async ({email,nome,telefone, senha:password}:IUpdateRequest, repo: typeof Contacts | typeof Clients, id:string ):Promise<IPerson> =>{

    const repository = AppDataSource.getRepository(repo)

    const userFound = await repository.findOneBy({id})

    if(!userFound){
        throw new AppError('Usuário não encontrado')
    }


    if(repo === Clients){
        const createdUser = repository.update(
            id,{
            nome,
            email,
            senha: password && hashSync(password, 10),
            telefone
        } as Clients)
    }else{
    const updated = await repository.update(id,{
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