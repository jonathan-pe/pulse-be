import { list, objectType, queryField } from 'nexus'
import { getSportsbooks } from '../utils/oddsblaze'
import { YogaInitialContext } from 'graphql-yoga'
import { requireAuth } from '../middleware/requireAuth'

// Type
export const SportsbookSchema = objectType({
  name: 'Sportsbook',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('state')
    t.string('country')
    t.boolean('fantasy')
    t.boolean('sgp')
    t.field('clone', {
      type: 'Sportsbook',
    })
  },
})

// Queries
export const SportsbooksQuery = queryField('sportsbooks', {
  type: list('Sportsbook'),
  resolve: async (_root, _args, ctx: YogaInitialContext) => {
    await requireAuth(ctx)

    return getSportsbooks()
  },
})
