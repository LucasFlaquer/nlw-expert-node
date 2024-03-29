import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import z from 'zod';

const app = fastify()
const prisma = new PrismaClient()

app.post('/polls', async (req, res) => {
  const createPollBody = z.object({ title: z.string() })
  const { title } = createPollBody.parse(req.body)
  const createdPoll = await prisma.poll.create({ data:{ title } })  
  return res.status(201).send({ pollId: createdPoll.id })
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running')
})