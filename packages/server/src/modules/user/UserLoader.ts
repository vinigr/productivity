import DataLoader from 'dataloader';
import mongoose from 'mongoose';

import { GraphQLContext } from '../../TypeDefinition';

import UserModel, { IUser } from './UserModel';

declare type ObjectId = mongoose.Schema.Types.ObjectId;

export default class User {
  id: string;

  _id: ObjectId;

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

export const loadOne = async (context: GraphQLContext, id: string | Object | ObjectId): Promise<User | null> => {
  if (!id || id !== 'string') {
    return null;
  }

  try {
    const data;
    return;
  } catch (err) {}
};
