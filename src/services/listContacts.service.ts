import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import { ICreateRequest, IPerson } from "../interfaces/clients"
import AppError from "../Error/AppError"

const listService = async (repo: typeof Contacts | typeof Clients):Promise<IPerson[]> =>{
    
    const repository = AppDataSource.getRepository(repo)
    const list = await repository.find()

    if(list.length == 0){
        throw new AppError('Nenhum registro encontrado',404)
    }


    const listNoPassword = list.map(obj => {
        const {senha, ...rest} = obj
        return rest
    })

    return listNoPassword
}

export default listService