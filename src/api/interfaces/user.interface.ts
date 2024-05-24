export interface UserInterface {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  isSpam: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface queryParams {
  page?: number;
  limit?: number;
}

export interface searchUserFilter extends queryParams {
  name: string;
  phone_number: string;
}
