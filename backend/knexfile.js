// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// module.exports = {

//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },

//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'student_management',
//       user:     'root',
//       password: '123456'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },

//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

// };

module.exports = {  
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'student_management',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
