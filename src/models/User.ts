import { objectType, queryType, mutationType, mutationField, queryField } from 'nexus'
import { User } from 'nexus-prisma'

// User Type
export const UserSchema = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id)
    t.field(User.email)
    t.field(User.name)
  },
})

// Query Type
export const UserByIdQuery = queryField('userById', {
  type: 'User',
  args: {
    id: 'String',
  },
  resolve: (_, { id }, { prisma }) => prisma.user.findUnique({ where: { id } }),
})

// Mutation Type
export const CreateUser = mutationField('createUser', {
  type: 'User',
  args: {
    email: 'String',
    name: 'String',
  },
  resolve: (_, { email, name }, { prisma }) => prisma.user.create({ data: { email, name } }),
})
