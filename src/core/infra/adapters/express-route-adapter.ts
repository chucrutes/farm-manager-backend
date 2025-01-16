import type { Request, Response } from 'express'
import type { Controller } from '../controller'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      requesterId: request.requesterId,
    }

    const httpResponse = await controller.handle(requestData)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
