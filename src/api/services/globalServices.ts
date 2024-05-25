import { search } from '../../db/dal/global_contact';

export const searchGlobalContact = async (
  filter: { phone_number?: string } | { name: string }
) => {
  return search(filter);
};


