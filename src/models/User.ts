import { objectType, mutationField, queryField } from 'nexus'
import { Account, Authenticator, Session, User, VerificationToken } from 'nexus-prisma'

// User Type
export const UserSchema = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id)
    t.field(User.email)
    t.field(User.name)
    t.field(User.emailVerified)
    t.field(User.image)
    t.field(User.accounts)
    t.field(User.sessions)
    t.field(User.UserStats)
    t.field(User.createdAt)
    t.field(User.updatedAt)
    t.field(User.Authenticator)
  },
})

export const AccountSchema = objectType({
  name: Account.$name,
  description: Account.$description,
  definition(t) {
    t.field(Account.userId)
    t.field(Account.type)
    t.field(Account.provider)
    t.field(Account.providerAccountId)
    t.field(Account.refresh_token)
    t.field(Account.access_token)
    t.field(Account.expires_at)
    t.field(Account.token_type)
    t.field(Account.scope)
    t.field(Account.id_token)
    t.field(Account.session_state)

    t.field(Account.createdAt)
    t.field(Account.updatedAt)

    t.field(Account.user)
  },
})

export const SessionSchema = objectType({
  name: Session.$name,
  description: Session.$description,
  definition(t) {
    t.field(Session.sessionToken)
    t.field(Session.userId)
    t.field(Session.expires)
    t.field(Session.user)

    t.field(Session.createdAt)
    t.field(Session.updatedAt)
  },
})

export const VerificationTokenSchema = objectType({
  name: VerificationToken.$name,
  description: VerificationToken.$description,
  definition(t) {
    t.field(VerificationToken.identifier)
    t.field(VerificationToken.token)
    t.field(VerificationToken.expires)
  },
})

export const AuthenticatorSchema = objectType({
  name: Authenticator.$name,
  description: Authenticator.$description,
  definition(t) {
    t.field(Authenticator.credentialID)
    t.field(Authenticator.userId)
    t.field(Authenticator.providerAccountId)
    t.field(Authenticator.credentialPublicKey)
    t.field(Authenticator.counter)
    t.field(Authenticator.credentialDeviceType)
    t.field(Authenticator.credentialBackedUp)
    t.field(Authenticator.transports)

    t.field(Authenticator.user)
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
