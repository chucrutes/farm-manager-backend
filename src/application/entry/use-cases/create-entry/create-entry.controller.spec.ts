import { app } from '@/infra/http/app'
import { prismaClient } from '@/infra/prisma/client'
import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { afterAll, describe, expect, test } from 'vitest'

describe('Create user (end-to-end)', () => {
  afterAll(async () => {
    await prismaClient.user.deleteMany({
      where: { name: { contains: 'test' } }
    })
  })

  test('should create an user', async () => {
    const data = {
      name: 'test',
      email: 'test-create-user@test.com',
      password: '12345678',
      confirmPassword: '12345678'
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.CREATED)
  })

  test('should not be able to create an user with invalid data', async () => {
    const data = {
      name: 'test',
      confirmPassword: '12345678'
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.BAD_REQUEST)
  })

  test('should not be able to create an user with existing email', async () => {
    const data = {
      name: 'test',
      email: 'test-existing-email@test.com',
      password: '12345678',
      confirmPassword: '12345678'
    }

    const response = await request(app).post('/api/auth/sign-up').send(data)
    expect(response.status).toBe(StatusCodes.CREATED)

    const response2 = await request(app).post('/api/auth/sign-up').send(data)
    expect(response2.status).toBe(StatusCodes.CONFLICT)
  })
})
