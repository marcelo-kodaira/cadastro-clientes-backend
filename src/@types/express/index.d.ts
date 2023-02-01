import * as express from "express"
import Contacts from "../../entities/contacts.entity"

declare global {
    namespace Express {
        interface Request {
            repository: typeof Contacts | typeof Clients,
            user:{
                id
            }
        }
    }
}