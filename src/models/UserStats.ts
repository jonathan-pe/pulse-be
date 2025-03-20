import { builder } from '../pothosBuilder'
import { prisma } from '../db'

export interface UserStats {
  id: string
  userId: string
  points: number
  longestStreak: number
  currentStreak: number
  totalPredictions: number
  correctPredictions: number
  createdAt: Date
  updatedAt: Date
}

// User Type
const UserStats = builder.prismaObject('UserStats', {
  name: 'UserStats',
  description: 'A user stats object',
  fields: (t) => ({
    id: t.exposeID('id'),
    userId: t.exposeString('userId'),
    points: t.exposeInt('points'),
    longestStreak: t.exposeInt('longestStreak'),
    currentStreak: t.exposeInt('currentStreak'),
    totalPredictions: t.exposeInt('totalPredictions'),
    correctPredictions: t.exposeInt('correctPredictions'),
    createdAt: t.expose('createdAt', { type: 'Date' }),
    updatedAt: t.expose('updatedAt', { type: 'Date' }),
  }),
})

// Query Type
builder.queryField('userStatsByUserId', (t) =>
  t.prismaField({
    type: UserStats,
    args: {
      userId: t.arg({
        type: 'String',
        required: true,
        description: "The ID of the user's stats to retrieve",
      }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return await prisma.userStats.findUniqueOrThrow({ ...query, where: { userId: args.userId } })
    },
  })
)

// Mutation Type
// export const CreateUserStats = mutationField('createUserStats', {
//   type: 'UserStats',
//   resolve: async (_, _args, ctx) => {
//     const { prisma, auth } = ctx

//     const userId = (auth as AuthObject).userId

//     const stats = await prisma.userStats.findUnique({ where: { userId } })

//     if (stats) {
//       return stats
//     }

//     return await prisma.userStats.create({
//       data: { userId },
//     })
//   },
// })

// export const UpdateUserStats = mutationField('updateUserStats', {
//   type: 'UserStats',
//   args: {
//     userId: 'String',
//     points: 'Int',
//     longestStreak: 'Int',
//     currentStreak: 'Int',
//     totalPredictions: 'Int',
//     correctPredictions: 'Int',
//   },
//   resolve: (_, { userId, points, longestStreak, currentStreak, totalPredictions, correctPredictions }, { prisma }) =>
//     prisma.userStats.update({
//       where: { userId },
//       data: { points, longestStreak, currentStreak, totalPredictions, correctPredictions },
//     }),
// })
