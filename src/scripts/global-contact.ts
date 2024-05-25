import { fakerEN as Faker } from '@faker-js/faker';
import { GlobalContact } from '../db/models';
import { create } from '../db/dal/global_contact';

export function createRandomGlobalContact() {
  return {
    phone_number: String(Faker.phone.number()),
    name: Faker.person.fullName(),
    isSpam: false,
  };
}

async function main() {
  try {
    for (let i = 0; i < 100; i++) {
      const payload: any = createRandomGlobalContact();
      const globalContact = await create(payload);
      console.log('🚀 ~ main ~ globalContact:', globalContact);
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
}

main();
