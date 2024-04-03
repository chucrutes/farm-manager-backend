import { SendMailOptions } from 'nodemailer'

export interface IEmailService {
  sendEmail(props: SendMailOptions): Promise<void>
}
