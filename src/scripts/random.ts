import { fakerEN } from '@faker-js/faker';
import * as userService from '../api/services/userServices';
import { removeSpecialChars } from '../utils/helper';

export function createRandomUser() {
  return {
    email: fakerEN.internet.email(),
    password: 'Test@123',
    phone_number: removeSpecialChars(fakerEN.phone.number().toString()),
    name: fakerEN.person.fullName(),
  };
}

async function main() {
  try {
    for (let i = 0; i < 100; i++) {
      const payload: any = createRandomUser();
      const user = await userService.create(payload);
      console.log('🚀 ~ main ~ user:', user);
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

// main();
