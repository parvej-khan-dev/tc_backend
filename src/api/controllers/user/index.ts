import * as service from '../../services/userServices';
import * as mapper from './mapper';
import { Request, Response } from 'express';
import { handleError, handleSuccess } from '../../../utils/responseHandler';
import { updateProfileSchema } from '../../schema';
import { validateRequest } from '../../../utils/requestHandler';
import { UserOutput } from '../../../db/models/User';
import { searchUserFilter } from '../../interfaces/user.interface';

export const userSearchByPhoneNumber = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { phone_number } = req.query;
    const user = await service.getUserByPhoneNumber(phone_number as string);
    return handleSuccess(res, {
      data: {
        user: mapper.toUser(user as UserOutput),
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { id } = req.user as UserOutput;
    await validateRequest(payload, updateProfileSchema);
    const user = await service.update(Number(id), payload);
    return handleSuccess(res, {
      data: {
        user: mapper.toUser(user),
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const markAsSpam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('id is required to mark user as spam');
    }
    const user = await service.markAsSpam(Number(id));
    return handleSuccess(res, {
      data: {
        user: mapper.toUser(user),
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const usersInfo = await service.getAll(filters);
    return handleSuccess(res, {
      data: usersInfo,
    });
  } catch (error) {
    console.log('🚀 ~ search ~ error:', error);
    return handleError(res, error);
  }
};
