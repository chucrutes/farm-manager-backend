import type { Request, Response } from 'express'
import type { Controller } from '../controller'
import { setResponseHeaders } from '@/infra/http/@utils/express-utils'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      requesterId: request.requesterId
    }

    const httpResponse = await controller.handle(requestData)

    setResponseHeaders(response, httpResponse.headers)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
