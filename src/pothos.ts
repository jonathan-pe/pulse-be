import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { DateResolver } from 'graphql-scalars'
import { prisma } from './db'
import { YogaExpressContextWithAuth } from './types/pulse'

export const builder = new SchemaBuilder<{
  AuthScopes: {
    user: boolean
  }
  Scalars: {
    Date: { Input: Date; Output: Date }
  }
  PrismaTypes: PrismaTypes
}>({
  plugins: [ScopeAuthPlugin, PrismaPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount (defaults to true)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === 'production' ? null : 'warn',
  },
  scopeAuth: {
    treatErrorsAsUnauthorized: true,
    unauthorizedError: (parent, context, info, result) => new Error('Not Unauthorized'),
    // Define your authorization scopes here
    authScopes: async (context) => {
      const auth = (context as YogaExpressContextWithAuth).req.auth

      return {
        user: !!auth && !!auth.userId,
      }
    },
  },
})

builder.addScalarType('Date', DateResolver, {})
builder.queryType({ authScopes: { user: true } })
