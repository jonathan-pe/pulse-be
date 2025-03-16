import { list, objectType, queryField } from 'nexus'
import { getSportsbooks } from '../utils/rundownApi'

// Type
export const SportsbookSchema = objectType({
  name: 'Sportsbook',
  definition(t) {
    t.string('affiliate_id')
    t.string('affiliate_name')
    t.string('affiliate_url')
  },
})

// Queries
export const SportsbooksQuery = queryField('sportsbooks', {
  type: list('Sportsbook'),
  resolve: async (_root, _args, _ctx) => {
    return getSportsbooks()
  },
})
