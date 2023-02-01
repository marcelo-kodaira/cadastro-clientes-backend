import AppError from "../Error/AppError"
import AppDataSource from "../data-source"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import Clients from "../entities/clients.entity"
import { hashSync } from "bcrypt"

const createClientService = async ({nome, email,senha:password, telefone}:ICreateRequest):Promise<IPerson> =>{


    const repository = AppDataSource.getRepository(Clients)

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

    await repository.save(createdUser)

    const {senha, ...rest} = createdUser;
    return rest
}

export default createClientService