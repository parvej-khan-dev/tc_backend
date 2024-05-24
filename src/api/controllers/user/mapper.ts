import { UserAttributes, UserOutput } from '../../../db/models/User';
import { UserInterface } from '../../interfaces';

export const toUser = (user: UserOutput): UserInterface => {
  return {
    id: user.id,
    name: user.name,
    phone_number: user.phone_number,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  };
};
