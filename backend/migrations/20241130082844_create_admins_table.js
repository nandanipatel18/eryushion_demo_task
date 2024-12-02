/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("admins", (table) => {
        table.increments("id").primary();
        table.string("admin_name", 100).notNullable();
        table.string("admin_email").notNullable().unique();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("admins");
};
