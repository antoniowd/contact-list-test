import * as Knex from "knex";
import * as  faker from 'faker'

const createFakeUser = () => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    address: faker.address.direction(),
    phone: faker.phone.phoneNumber()
})

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("contacts").del();

    const fakeUsers = [];

    for (let i = 0; i < 20; i++) {
        fakeUsers.push(createFakeUser());
    }

    // Inserts seed entries
    await knex("contacts").insert(fakeUsers);
};
