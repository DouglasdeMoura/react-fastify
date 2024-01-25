import Fastify from 'fastify'
import { renderToStaticNodeStream } from 'react-dom/server'
import { Transform } from 'node:stream'

import { App } from './components/index.js'
import { Root } from './components/root.js'

type RenderArgs = {
  children: React.ReactNode
  title: string
}

const render = ({ title, children }: RenderArgs) => {
  let isFirstChunk = true

  const prepend = new Transform({
    transform(chunk, _encoding, callback) {
      if (isFirstChunk) {
        isFirstChunk = false
        this.push('<!DOCTYPE html>')
      }
      callback(null, chunk)
    },
  })

  return renderToStaticNodeStream(
    <Root title={title}>{children}</Root>
  ).pipe(prepend)
}

const fastify = Fastify({
  logger: true,
})

fastify.get('/', async function handler(_request, reply) {
  const stream = render({ children: <App />, title: 'Hello, World!' })

  reply.type('text/html')
  reply.send(stream)
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
