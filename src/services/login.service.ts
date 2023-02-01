import { ILogin } from "../interfaces/clients";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import AppDataSource from "../data-source";
import AppError from "../Error/AppError";
import { compareSync } from "bcrypt";
import Contacts from "../entities/contacts.entity";
import Clients from "../entities/clients.entity";


const loginService = async ({email,senha}:ILogin, repo: typeof Contacts | typeof Clients):Promise<string> =>{

    const repository = AppDataSource.getRepository(repo)

    const user = await repository.findOneBy({email})

    if (!user) {
        throw new AppError("Wrong password or email");
      }

    if (!compareSync(senha, user!.senha)) {
        throw new AppError("Wrong password or email");
      }

      const token = jwt.sign(
        {},
        process.env.SECRET_KEY as string,
        {
          subject: user.id,
          expiresIn: "1d",
        }
      );
    
    return token
}