import 'reflect-metadata'
import express from "express"
import "express-async-errors"
import handleErrorMiddleware from "./middlewares/handleError.middleware"
import contactsRoutes from './routes/contacts.routes'
import clientRoutes from './routes/clients.routes'

const app = express()
app.use(express.json())

app.use('/contacts',contactsRoutes)
app.use('/clients',clientRoutes)
app.use(handleErrorMiddleware)

export default app