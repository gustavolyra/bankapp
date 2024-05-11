import { FastifyInstance } from "fastify";
import { event } from "./event";
import { reset } from "./reset";
import { balance } from "./balance";


export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/event', event)
  app.post('/reset', reset)
  app.get('/balance', balance)

}