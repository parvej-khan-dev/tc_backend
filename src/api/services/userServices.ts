import * as UserDal from '../../db/dal/user';
import { GetAllUsersFilters } from '../../db/dal/types';
import User, {
  UserAttributes,
  UserInput,
  UserOutput,
} from '../../db/models/User';
import { comparePassword, hashPassword } from '../../utils/helper';

export const create = (payload: UserInput): Promise<UserOutput> => {
  payload.password = payload.password && hashPassword(payload.password);
  return UserDal.create(payload);
};

export const update = (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  return UserDal.update(id, payload);
};

export const getById = (id: number): Promise<UserOutput> => {
  return UserDal.getById(id);
};
export const deleteById = (id: number): Promise<boolean> => {
  return UserDal.deleteById(id);
};

export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
  return UserDal.getAll(filters);
};

export const getUserAndValidatePassword = async (payload: {
  phone_number: string;
  password: string;
}): Promise<UserAttributes> => {
  const user = await User.findOne({
    where: { phone_number: payload.phone_number },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const userData = user.get({ plain: true }) as UserAttributes;

  const isValidPassword = await comparePassword(
    payload.password,
    userData.password as string
  );

  if (!isValidPassword) {
    throw new Error('Invalid password');
  }

  return userData;
};
