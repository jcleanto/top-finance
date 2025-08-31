import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("finances").del();

    // Inserts seed entries
    await knex("finances").insert([
        { user_id: 1, valor: 10.1, descricao: "Descrição 1" },
        { user_id: 2, valor: 20.2, descricao: "Descrição 2" },
        { user_id: 3, valor: 30.3, descricao: "Descrição 3" },
    ]);
};
