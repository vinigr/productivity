import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { registerType, nodeInterface } from '../../interface/NodeInterface';

const UserType = registerType(
  new GraphQLObjectType({
    name: 'User',
    description: 'User Data',
    fields: () => ({
      id: globalIdField('User'),
      _id: {
        type: GraphQLString,
        resolve: (user) => user._id.toString(),
      },
      name: {
        type: GraphQLString,
        resolve: (user) => user.name,
      },
      email: {
        type: GraphQLString,
        resolve: (user) => user.email,
      },
    }),
    interfaces: () => [nodeInterface],
  }),
);

export default UserType;
