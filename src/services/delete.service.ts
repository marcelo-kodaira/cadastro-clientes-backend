import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import AppError from "../Error/AppError"

const deleteService = async(id:string, repo: typeof Contacts | typeof Clients):Promise<void> =>{

    const repository = AppDataSource.getRepository(repo)
    const userFound = await repository.findOneBy({id})

    if(!userFound){
        throw new AppError('Usuário não encontrado')
    }
    
    await repository.delete(id)
}

export default deleteService