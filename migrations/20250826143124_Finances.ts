import type { Knex } from "knex";

const tableName = 'finances';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id');
    t.integer('user_id');
    t.float('valor');
    t.string('descricao');
    t.boolean('is_deleted').defaultTo(false);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.timestamp('deleted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
