// @ts-nocheck
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { router } from './routes'
import { Server } from 'socket.io'
import { green } from 'console-log-colors'
import { interceptErrors } from './middlewares/intercept-errors'

export const app = express()
// const io = new Server({
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST']
//   }
// })

app.use(cors())
app.use(express.json())
app.get('/', (_, res) => {
  res.status(200).send('OK')
})
// io.on('connection', (socket) => {
//   console.log(green(socket.id))
//   console.log('a user connected')

//   socket.on('channel', (message: string) => {
//     console.log(message)
//     socket.emit('queue', `teste${message}`)
//   })

//   socket.emit('queue', 'teste')
// })
// io.listen(3001)
app.use('/api', router)
app.use(interceptErrors)
