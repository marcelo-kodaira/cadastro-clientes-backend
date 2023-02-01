import { NextFunction, Request, Response } from "express";
import Clients from "../entities/clients.entity";
import Contacts from "../entities/contacts.entity";


const addRepositoryToRequest = (req: Request, res: Response, next: NextFunction) => {
    if (req.url.includes('contact')) {
      req.repository = Contacts
    } else if (req.url.includes('client')) {
      req.repository = Clients
    }else {
        return res.status(400).send({
          error: "Route path must include either 'contact' or 'client'"
        });
      }
    next();
  };

export default addRepositoryToRequest