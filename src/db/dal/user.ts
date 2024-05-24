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
): Promise<{ users: UserOutput[]; total: number }> => {
  const { limit = 10, page = 0 } = filters || {};
  const offset = (page - 1) * limit;

  const whereClause: { [key: string]: any } = {};

  if (filters?.isDeleted) {
    whereClause.deletedAt = { [Op.not]: null };
  }
  if (filters?.name) {
    whereClause.name = { [Op.like]: `%${filters.name}%` };
  }

  if (filters?.phone_number) {
    whereClause.phone_number = filters.phone_number;
  }
  const { rows: users, count: total } = await User.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    paranoid: !filters?.includeDeleted,
  });

  return {
    users: users.map((user) => user.toJSON() as UserOutput),
    total,
  };
};
