import { Request, Response } from 'express'
import { Controller } from '../controller'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      currentUserId: request.userId,
      currentWorkspaceId: request.workspaceId,
      currentProjectId: request.projectId
    }

    const httpResponse = await controller.handle(requestData)

    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
