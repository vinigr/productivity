import DataLoader from 'dataloader';
import { Types } from 'mongoose';
import { mongooseLoader } from '@entria/graphql-mongoose-loader';

import { GraphQLContext } from '../../TypeDefinition';

import UserModel, { IUser } from './UserModel';

export default class User {
  id: string;

  _id: Types.ObjectId;

  name: string;

  email: string | null;

  constructor(data: IUser, { user }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.email = null;

    if (user && user._id.equals(data._id)) {
      this.email = data.email;
    }
  }
}

export const getLoader = () => new DataLoader((ids: ReadonlyArray<string>) => mongooseLoader(UserModel, ids));

export const load = async (context: GraphQLContext, id: string | Types.ObjectId): Promise<User | null> => {
  if (!id || id !== 'string') {
    return null;
  }

  try {
    const data = await context.dataloaders.UserLoader.load(id as string);
    return new User(data, context);
  } catch (err) {
    return null;
  }
};

export const loadByLogin = async (context: GraphQLContext, login: string): Promise<User | null> => {
  const user = await UserModel.findOne({ login });

  if (!user) return null;

  return new User(user, context);
};
