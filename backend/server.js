const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const knex = require("knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const studentRoutes = require('./routes/studentRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

// const db = knex(require("./knexfile").development);
const db = require('./DBconfig')
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentRoutes);
app.use('', authRoutes);
app.use('/admins', adminRoutes);
const PORT = 5000;


// db.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('MySQL connected...');
// });

createDefaultAdmin = async () => {
  try {
    const result = await db.execute('SELECT * FROM users WHERE type = ?', ['Admin']);
    const[rows] = result;
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.execute('INSERT INTO users (username, password, type) VALUES (?, ?, ?)', ['admin', hashedPassword, 'Admin']);
      console.log('Default admin created: username="admin", password="admin123"');
    }
  } catch (error) {
    console.log("creating default admin error",error)
  }
}
createDefaultAdmin();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
