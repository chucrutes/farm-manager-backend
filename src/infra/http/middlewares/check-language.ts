import i18next from 'i18next'
import { Request, Response, NextFunction } from 'express'

export const checkLanguage = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const acceptLanguage = req.headers['accept-language'] || 'en'

  const language = {
    pt: 'pt-BR',
    en: 'en-US'
  }

  i18next.changeLanguage(language[acceptLanguage])
  next()
}
