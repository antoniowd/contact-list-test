import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary;
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('address', 500).notNullable();
    table.string('phone').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contacts');
}

