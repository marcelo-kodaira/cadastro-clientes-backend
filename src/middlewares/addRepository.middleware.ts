import { NextFunction, Request, Response } from "express";
import Clients from "../entities/clients.entity";
import Contacts from "../entities/contacts.entity";


const addRepositoryToRequest = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('contacts')) {
      req.repository = Contacts
    } else if (req.originalUrl.includes('clients')) {
      req.repository = Clients
    }else {
        return res.status(400).send({
          error: 'req.originalUrl'
        });
      }
    next();
  };

export default addRepositoryToRequest