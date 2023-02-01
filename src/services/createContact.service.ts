import AppError from "../Error/AppError"
import AppDataSource from "../data-source"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { hashSync } from "bcrypt"
import { sensitiveHeaders } from "http2"

const createService = async ({nome, email,senha:password, telefone}:ICreateRequest, repo: typeof Contacts | typeof Clients):Promise<IPerson> =>{


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
        senha: hashSync(password, 10),
        telefone
    })

    const {senha, ...userNoPassword} = createdUser

    await repository.save(createdUser)

    return userNoPassword

}
export default createService