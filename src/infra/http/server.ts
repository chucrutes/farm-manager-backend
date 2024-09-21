import { app } from './app'
import { env } from '@/config'
import { langs } from './i18n'
import { green } from 'console-log-colors'

const PORT = env.PORT || 3333

app.listen(PORT, () => {
  console.log('📝 Languages loaded successfully', langs)
  console.log('🚀 Server running at', green(PORT))
})
