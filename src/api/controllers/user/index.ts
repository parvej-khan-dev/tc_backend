import * as service from '../../services/userServices';
import * as mapper from './mapper';
import { Request, Response } from 'express';
import { handleError, handleSuccess } from '../../../utils/responseHandler';
import { signedToken } from '../../../utils/helper';
import { loginSchema, userRegisterSchema } from '../../schema';
import { validateRequest } from '../../../utils/requestHandler';
import { UserOutput } from '../../../db/models/User';

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload = req.body;
    await validateRequest(payload, userRegisterSchema);
    const user = await service.create(payload);
    const token = signedToken({ userId: user.id });
    return handleSuccess(res, {
      data: {
        user: mapper.toUser(user),
        token,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const payload = req.body;
    await validateRequest(payload, loginSchema);
    // validate user with password
    const user = await service.getUserAndValidatePassword(payload);
    // get token
    const token = signedToken({ userId: user.id });
    return handleSuccess(res, {
      data: {
        user: mapper.toUser(user as UserOutput),
        token,
      },
    });
  } catch (err) {
    return handleError(res, err);
  }
};
