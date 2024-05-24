export interface UserInterface {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
