export const requireAuth = (resolver: (arg0: any, arg1: any, arg2: any, arg3: any) => any) => async (
  parent: any,
  args: any,
  context: { user: any },
  info: any
) => {
  if (!context.user) {
    throw new Error('Unauthorized')
  }
  return resolver(parent, args, context, info)
}
