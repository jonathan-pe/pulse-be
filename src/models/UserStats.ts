import { objectType, queryType, mutationType, queryField, mutationField } from 'nexus'
import { UserStats } from 'nexus-prisma'
import { requireAuth } from '../middleware/requireAuth'

// User Type
export const UserStatsSchema = objectType({
  name: UserStats.$name,
  description: UserStats.$description,
  definition(t) {
    t.field(UserStats.id)
    t.field(UserStats.userId)
    t.field(UserStats.points)
    t.field(UserStats.longestStreak)
    t.field(UserStats.currentStreak)
    t.field(UserStats.totalPredictions)
    t.field(UserStats.correctPredictions)
    t.field(UserStats.createdAt)
    t.field(UserStats.updatedAt)
    t.field(UserStats.user)
  },
})

// Query Type
export const UserStatsByUserIdQuery = queryField('userStatsByUserId', {
  type: 'UserStats',
  args: {
    userId: 'String',
  },
  resolve: async (_, { userId }, ctx) => {
    await requireAuth(ctx)

    const { prisma } = ctx

    let stats = await prisma.userStats.findUnique({ where: { userId } })

    if (!stats) {
      stats = await prisma.userStats.create({ data: { userId } })
    }

    return stats
  },
})

// Mutation Type
export const CreateUserStats = mutationField('createUserStats', {
  type: 'UserStats',
  resolve: async (_, _args, ctx) => {
    const user = await requireAuth(ctx)

    const { prisma } = ctx

    const stats = await prisma.userStats.findUnique({ where: { userId: user.id } })

    if (stats) {
      return stats
    }

    return await prisma.userStats.create({
      data: { userId: user.id },
    })
  },
})

export const UpdateUserStats = mutationField('updateUserStats', {
  type: 'UserStats',
  args: {
    userId: 'String',
    points: 'Int',
    longestStreak: 'Int',
    currentStreak: 'Int',
    totalPredictions: 'Int',
    correctPredictions: 'Int',
  },
  resolve: (_, { userId, points, longestStreak, currentStreak, totalPredictions, correctPredictions }, { prisma }) =>
    prisma.userStats.update({
      where: { userId },
      data: { points, longestStreak, currentStreak, totalPredictions, correctPredictions },
    }),
})
