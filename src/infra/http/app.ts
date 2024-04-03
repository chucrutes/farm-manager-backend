import './i18n'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import { router } from './routes'
import { checkLanguage } from './middlewares/check-language'
import { interceptErrors } from './middlewares/intercept-errors'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(checkLanguage)
app.get('/', (_, res) => {
  res.status(200).send('OK')
})
app.use('/api', router)
app.use(interceptErrors)
