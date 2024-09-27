// @ts-nocheck
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { router } from './routes'
import { Server } from 'socket.io'
import { green } from 'console-log-colors'
import { interceptErrors } from './middlewares/intercept-errors'

export const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (_, res) => {
  res.status(200).send('OK')
})
app.use('/api', router)
app.use(interceptErrors)
