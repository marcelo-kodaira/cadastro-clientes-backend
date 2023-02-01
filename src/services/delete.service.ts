import AppDataSource from "../data-source"
import Contacts from "../entities/contacts.entity"
import Clients from "../entities/clients.entity"
import AppError from "../Error/AppError"

const deleteService = async(clientId: string, repo: typeof Contacts | typeof Clients, contactId?:string):Promise<void> =>{

    const repository = AppDataSource.getRepository(repo)

    
    if(repo === Clients){
        console.log('opaaaaaaasssssssssssss')
        console.log(clientId)
        await repository.delete(clientId)
    }else{
        const contactFound = await repository.findOneBy({
            id:contactId,
            clients:{
                id: clientId
            }
        })
        if(!contactFound){
            throw new AppError('Contato não encontrado ou o usuário não permite permissão para deletar este contato',404)
        }
        await repository.delete(contactId!)
    }

}

export default deleteService