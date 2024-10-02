import { Server, type Socket } from 'socket.io'

export class SocketClient {
  private server: Server
  constructor() {
    this.server = new Server({
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    })
  }

  emitUserMessage(socket: Socket, message: string) {
    socket.emit('userMessage', message)
  }

  emitBotMessage(socket: Socket, message: string) {
    socket.emit('botMessage', message)
  }

  emitNotification(socket: Socket, message: string) {
    socket.emit('notification', message)
  }

  //   broadcastNotification(socket:Socket, message: string) {
  //     this.emitNotification(socket.broadcast, message)
  //   }

  //   emitDisconnect(socket: Socket) {
  //     socket.on('disconnect', (reason) => {
  //       this.broadcastNotification(socket, reason)
  //     })
  //   }

  teste(socket: Socket) {
    socket.on('disconnect', () => {
      socket.broadcast.emit(`${socket.id} disconnected`)
    })
  }

  initializeSocket() {
    this.server.on('connection', (socket) => {
      this.emitNotification(socket, 'emit1')
      this.emitBotMessage(socket, 'emit2')
      this.emitBotMessage(socket, 'emit3')
    })
  }
}
