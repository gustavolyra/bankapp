import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { transactionsRoutes } from './http/transactions/routes'

export const app = fastify()

app.register(transactionsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(404)
      .send({ message: 'Validation error', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error!' })
})
