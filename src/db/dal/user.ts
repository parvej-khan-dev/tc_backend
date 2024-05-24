import { Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User';
import { GetAllUsersFilters } from './types';
import { UserInterface } from '../../api/interfaces';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const isUserExist = await User.findOne({
    where: {
      phone_number: payload.phone_number,
    },
  });
  if (isUserExist) {
    throw new Error('User already exists with phone_number');
  }
  const newUser = await User.create(payload);
  return newUser.toJSON() as UserOutput;
};
export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('not found');
  }
  const updatedUser = await user.update(payload);
  return updatedUser.toJSON() as UserOutput;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('user not found');
  }
  return user.toJSON() as UserOutput;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getAll = async (
  filters?: GetAllUsersFilters
): Promise<UserOutput[]> => {
  const whereClause: { [key: string]: any } = {};

  if (filters?.isDeleted) {
    whereClause.deletedAt = { [Op.not]: null };
  }
  const users = await User.findAll({
    where: whereClause,
    paranoid: !filters?.includeDeleted,
  });
  return users.map((user) => user.toJSON() as UserOutput);
};
