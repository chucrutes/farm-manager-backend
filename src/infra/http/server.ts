import { green } from 'console-log-colors'
import { app } from './app'
import { env } from '@/config'

const PORT = env.PORT || 3333

app.listen(PORT, () => {
  console.log('🚀 Server running at', green(PORT))
})
