import { Op, where } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User';
import { GetAllUsersFilters, paginationResult } from './types';
import { UserInterface } from '../../api/interfaces';
import * as GlobalDal from './global_contact';
import { GlobalContactOutput } from '../models/GlobalContact';

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
): Promise<paginationResult> => {
  let page = filters?.page ? Number(filters?.page) : 1;
  let limit = filters?.limit ? Number(filters?.limit) : 10;
  let offset = limit * (page - 1);
  let totalRecords = 0;

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
    attributes: { exclude: ['password'] },
    limit,
    offset,
    paranoid: !filters?.includeDeleted,
  });

  if (filters?.phone_number && users.length === 0) {
    const globalContact = await GlobalDal.search({
      phone_number: filters.phone_number,
    });
    if (globalContact.total > 0) {
      return {
        users: globalContact.globalContacts,
        total: globalContact.total,
        limit,
        page,
        totalPage: Math.ceil(globalContact.total / limit),
      };
    }
  }

  return {
    users: users.map((user) => user.toJSON() as UserOutput),
    total,
    limit,
    page,
    totalPage: Math.ceil(total / Number(limit)),
  };
};
