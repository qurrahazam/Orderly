import 'dotenv/config'
import path from 'node:path'
import { defineConfig } from 'prisma/config'

const isLocal = process.env.NODE_ENV === 'development'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    path: isLocal
      ? path.join('prisma', 'local_migrations')
      : path.join('prisma', 'migrations'),
  },
})