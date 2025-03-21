import { getLeagues } from '../utils/rundownApi'
import { builder } from '../pothos'

export interface League {
  id: number
  name: string
  sport: string
}

// Type
const LeagueRef = builder.objectRef<League>('League')

LeagueRef.implement({
  description: 'A Rundown API league',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    sport: t.exposeString('sport'),
  }),
})

// Queries
builder.queryField('leagues', (t) =>
  t.field({
    type: [LeagueRef],
    resolve: async () => {
      return await getLeagues()
    },
  })
)
