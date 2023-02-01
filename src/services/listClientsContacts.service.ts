import AppDataSource from "../data-source";
import Clients from "../entities/clients.entity";
import Contacts from "../entities/contacts.entity";


const listClientsContactsService = async(clientId:string,page: number, pageSize:number): Promise<Contacts[]> =>{

    const contactsRepository = AppDataSource.getRepository(Contacts)

    const contacts = await contactsRepository.find({
        order:{
            nome: "ASC"
        },
        where: { 
            clients:{
                id: clientId
            } 
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    })

    return contacts!
}

export default listClientsContactsService