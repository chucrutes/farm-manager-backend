
export interface IEmailService {
  sendEmail(props: any): Promise<void>
}
