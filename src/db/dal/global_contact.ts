import { Op } from 'sequelize';
import { GlobalContact } from '../models';
import {
  GlobalContactInput,
  GlobalContactOutput,
} from '../models/GlobalContact';

const create = async (
  payload: GlobalContactInput
): Promise<GlobalContactOutput> => {
  const globalContact = await GlobalContact.create(payload);
  return globalContact;
};

const search = async (filters: {
  name?: string;
  phone_number?: string;
  page?: number;
  limit?: number;
}) => {
  const where: { [key: string]: any } = {};
  let page = filters?.page ? Number(filters?.page) : 1;
  let limit = filters?.limit ? Number(filters?.limit) : 10;
  let offset = limit * (page - 1);
  if (filters?.name) {
    where.name = { [Op.like]: `%${filters.name}%` };
  }
  if (filters?.phone_number) {
    where.phone_number = { [Op.like]: `%${filters.phone_number}%` };
  }

  const globalContacts = await GlobalContact.findAndCountAll({
    where,
    limit,
    offset,
  });
  return {
    total: globalContacts.count,
    page,
    limit,
    totalPage: Math.ceil(globalContacts.count / limit),
    globalContacts: globalContacts.rows,
  };
};

export { create, search };
