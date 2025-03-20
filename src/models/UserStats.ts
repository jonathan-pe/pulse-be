import { AuthObject } from '@clerk/express'
import { objectType, queryField, mutationField } from 'nexus'
import { UserStats } from 'nexus-prisma'

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
  },
})

// Query Type
export const UserStatsByUserIdQuery = queryField('userStatsByUserId', {
  type: 'UserStats',
  args: {
    id: 'String',
  },
  resolve: async (_, { id }, ctx) => {
    const { prisma } = ctx

    return await prisma.userStats.findUnique({ where: { userId: id } })
  },
})

// Mutation Type
export const CreateUserStats = mutationField('createUserStats', {
  type: 'UserStats',
  resolve: async (_, _args, ctx) => {
    const { prisma, auth } = ctx

    const userId = (auth as AuthObject).userId

    const stats = await prisma.userStats.findUnique({ where: { userId } })

    if (stats) {
      return stats
    }

    return await prisma.userStats.create({
      data: { userId },
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
