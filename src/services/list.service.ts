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

    if (("senha" in list) && (repo === Clients)) {
        const listNoPassword = list.map(obj => {
          if (obj instanceof Clients) {
            const {senha, ...rest} = obj as Clients;
            return rest;
          }
          return obj;
        });
        return listNoPassword
      } 

    return list
}

export default listService