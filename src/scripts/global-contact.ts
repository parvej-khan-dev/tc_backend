import { fakerEN as Faker } from '@faker-js/faker';
import { GlobalContact } from '../db/models';
import { create } from '../db/dal/global_contact';
import { removeSpecialChars } from '../utils/helper';

export function createRandomGlobalContact() {
  return {
    phone_number: removeSpecialChars(Faker.phone.number().toString()),
    name: Faker.person.fullName(),
    isSpam: false,
  };
}

async function main() {
  try {
    for (let i = 0; i < 50; i++) {
      const payload: any = createRandomGlobalContact();
      const globalContact = await create(payload);
      console.log('🚀 ~ main ~ globalContact:', globalContact);
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

main();
