import { env } from '@/config'
import nodemailer, { SendMailOptions, TransportOptions } from 'nodemailer'
import { IEmailService } from '../models/IEmailService'

export class NodeMailerService implements IEmailService {
  private init() {
    const transporter = nodemailer.createTransport({
      host: env.HOSTINGER_EMAIL_HOST,
      port: env.HOSTINGER_EMAIL_PORT,
      secure: env.HOSTINGER_EMAIL_PORT === 465,
      auth: {
        user: env.HOSTINGER_EMAIL_USER,
        pass: env.HOSTINGER_EMAIL_PASSWORD
      }
    } as TransportOptions)

    return transporter
  }

  async sendEmail({ from, ...props }: SendMailOptions): Promise<void> {
    const transporter = this.init()

    await transporter.sendMail({
      from: `${from} ${env.HOSTINGER_EMAIL_USER}`,
      ...props
    })
  }
}
