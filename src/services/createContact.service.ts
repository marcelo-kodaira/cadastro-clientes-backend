import AppError from "../Error"
import AppDataSource from "../data-source"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"

const createService = async ({nome, email, telefone}:ICreateRequest, repo: typeof Contacts | typeof Clients):Promise<IPerson> =>{


    const repository = AppDataSource.getRepository(repo)

    const emailAlreadyExists = await repository.findOneBy({
        email
    })

    if(emailAlreadyExists){
        throw new AppError('Email ja cadastrado')
    }

    const createdUser = repository.create({
        nome,
        email,
        telefone
    })

    return await repository.save(createdUser)

}
export default createService