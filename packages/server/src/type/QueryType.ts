import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import UserType from '../modules/user/UserType';
import { UserLoader } from '../loader';

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: 'Say hello',
      resolve: () => 'Hello',
    },
    user: {
      type: UserType,
      description: 'Fetch a user by its email',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args, context) => UserLoader.loadByEmail(context, args.email),
    },
  }),
});
