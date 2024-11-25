import { list, nonNull, objectType, queryField } from 'nexus'
import { getGames } from '../utils/oddsblaze'
import { YogaInitialContext } from 'graphql-yoga'
import { requireAuth } from '../middleware/requireAuth'

// Type
export const TeamSchema = objectType({
  name: 'Team',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('abbreviation')
  },
})

export const PlayerSchema = objectType({
  name: 'Player',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('position')
    t.field('team', {
      type: 'Team',
    })
  },
})

export const OddSchema = objectType({
  name: 'Odd',
  definition(t) {
    t.string('id')
    t.string('group')
    t.string('market')
    t.string('name')
    t.boolean('main')
    t.string('price')
    t.nullable.float('points')
    t.string('selection')
    t.string('link')
    t.string('sgp')
    t.string('grade')
    t.list.field('players', {
      type: 'Player',
    })
    t.string('updated')
  },
})

export const OddsSportsbookSchema = objectType({
  name: 'OddsSportsbook',
  definition(t) {
    t.string('id')
    t.string('name')
    t.list.field('odds', {
      type: 'Odd',
    })
  },
})

export const GameSchema = objectType({
  name: 'Game',
  definition(t) {
    t.string('id')
    t.string('sport')
    t.string('league')
    t.field('teams', {
      type: objectType({
        name: 'Teams',
        definition(t) {
          t.field('home', { type: 'Team' })
          t.field('away', { type: 'Team' })
        },
      }),
    })
    t.string('start')
    t.string('status')
    t.boolean('live')
    t.string('tournament') // name of event? (e.g. "Brooklyn Nets at New Orleans Pelicans")
    t.list.field('sportsbooks', {
      type: 'OddsSportsbook',
    })
  },
})

// Queries
export const GamesQuery = queryField('games', {
  type: list('Game'),
  args: {
    leagueId: nonNull('String'),
    sportsbookId: nonNull('String'),
  },
  resolve: async (_root, { leagueId, sportsbookId }, ctx: YogaInitialContext) => {
    await requireAuth(ctx)

    return getGames(leagueId, sportsbookId)
  },
})
