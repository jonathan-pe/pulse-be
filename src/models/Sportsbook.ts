import { getSportsbooks } from '../utils/rundownApi'
import { builder } from '../pothosBuilder'

export interface Sportsbook {
  id: number
  name: string
  url: string
}

// Type
const SportsbookRef = builder.objectRef<Sportsbook>('Sportsbook')

SportsbookRef.implement({
  description: 'A Rundown API sportsbook',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    url: t.exposeString('url'),
  }),
})

// Queries
builder.queryField('sportsbooks', (t) =>
  t.field({
    type: [SportsbookRef],
    resolve: async () => {
      return await getSportsbooks()
    },
  })
)
