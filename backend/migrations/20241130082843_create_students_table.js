/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("students", (table) => {
        table.increments("id").primary();
        table.string("student_name", 100).notNullable();
        table.date("student_dob").notNullable();
        table.enu("student_gender", ["Male", "Female", "Other"]).notNullable();
        table.string("student_email").notNullable().unique();
        table.string("student_phone", 10).notNullable();
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("students");
};
