import fastify, { FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { transactionsRoutes } from './http/transactions/routes'

export const app = fastify();

app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req: FastifyRequest, body, done) {
  try {
    if (!body) body = '1'
    var json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})



app.register(transactionsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(404)
      .send({ message: 'Validation error', issue: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({ message: error.message })
})
