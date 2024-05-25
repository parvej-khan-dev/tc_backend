import { GlobalContactOutput } from '../models/GlobalContact';
import { UserOutput } from '../models/User';

export interface GetAllUsersFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
  name?: string;
  email?: string;
  phone_number?: string;
  page?: number;
  limit?: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserOutput;
  }
}

export interface paginationResult {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
  users: UserOutput[] | GlobalContactOutput[];
}
