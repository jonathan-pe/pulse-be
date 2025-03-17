import { list, objectType, queryField } from 'nexus'
import { getLeagues } from '../utils/rundownApi'

// Type
export const LeagueSchema = objectType({
  name: 'League',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('sport')
  },
})

// Queries
export const LeaguesQuery = queryField('leagues', {
  type: list('League'),
  resolve: async (_root, _args, _ctx) => {
    return await getLeagues()
  },
})
