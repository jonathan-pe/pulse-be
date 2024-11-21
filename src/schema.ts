import { asNexusMethod, makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './models'
import { DateTimeResolver } from 'graphql-scalars'

const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const schema = makeSchema({
  types: [DateTime, types],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
})
