import Fastify from 'fastify'
import { renderToStaticMarkup } from 'react-dom/server'

import { App } from './components/index.js'
import { Root } from './components/root.js'

type RenderArgs = {
  children: React.ReactNode
  title: string
}

const render = ({ title, children }: RenderArgs) =>
  `<!DOCTYPE html>${renderToStaticMarkup(
    <Root title={title}>{children}</Root>
  )}`

const fastify = Fastify({
  logger: true,
})

fastify.get('/', async function handler(_request, reply) {
  reply.type('text/html')
  return render({ children: <App />, title: 'Hello, World!' })
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
