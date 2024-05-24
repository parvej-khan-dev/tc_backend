import { Request, Response } from 'express';
import { signedToken } from '../../../utils/helper';
import { validateRequest } from '../../../utils/requestHandler';
import { handleError, handleSuccess } from '../../../utils/responseHandler';
import { loginSchema, userRegisterSchema } from '../../schema';
import * as service from '../../services/userServices';
import * as mapper from '../user/mapper';
import { UserOutput } from '../../../db/models/User';

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload = req.body;
    await validateRequest(payload, userRegisterSchema);
    const user = await service.create(payload);
    const token = signedToken({ id: user.id });
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
    const token = signedToken({ id: user.id });
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
