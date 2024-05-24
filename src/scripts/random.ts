import { fakerEN } from '@faker-js/faker';
import * as userService from '../api/services/userServices';

export function createRandomUser() {
  return {
    email: fakerEN.internet.email(),
    password: fakerEN.internet.password(),
    phone_number: String(fakerEN.phone.number()),
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
