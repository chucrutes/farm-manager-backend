import { CreateOtp } from '@/application/otp/use-cases/create-otp/create-otp'
import { Either, left, right } from '@/core/logic/either'
import { IEmailService } from '@/infra/providers/models/IEmailService'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { OtpNotCreatedError } from './errors/OtpNotCreatedError'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'

type ForgotPasswordRequest = {
  email: string
}

type ForgotPassWordResponse = Either<
  UserDoesNotExistError | OtpNotCreatedError,
  null
>

export class ForgotPassword {
  constructor(
    private usersRepository: IUsersRepository,
    private emailService: IEmailService,
    private createOtp: CreateOtp
  ) {}

  async execute({
    email
  }: ForgotPasswordRequest): Promise<ForgotPassWordResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const otp = await this.createOtp.execute({ email })

    if (otp.isLeft()) {
      throw new OtpNotCreatedError()
    }

    await this.emailService.sendEmail({
      from: 'Silver Bullet Code',
      to: email,
      subject: 'Recover Password',
      html: `Here is your code: ${otp.value}`
    })

    return right(null)
  }
}
