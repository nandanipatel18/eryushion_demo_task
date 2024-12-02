const db = require('../DBconfig');
const bcrypt = require('bcrypt')
const { use } = require('../routes/studentRoutes');
const SECRET_KEY = 'secret_key';
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { username, password, type } = req.body;
        console.log("loginn")
        console.log(req.body)
        const [user] = await db.execute('SELECT * FROM users WHERE username = ? && type = ?', [username, type]);
        console.log(user)
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            console.log("in false")
            return res.json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user[0].id, username: user[0].username, type: user[0].type }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ "user": user[0],token, message: "login success" })
       
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

exports.register = async (req, res) => {
    try {
        
        const { username, password, type } = req.body.formData
        const hashedPassword = await bcrypt.hash(password, 10);
        const [existingUser] = await db.execute('SELECT * FROM users WHERE username = ? && type = ?', [username, type])
       
        if (existingUser.length > 0) {
            return res.json("user already exists with this username");
        }
        const [userResult] = await db.execute('INSERT INTO users (username, password, type) VALUES (?, ?, ?)',
            [username, hashedPassword, type]);
        const userId = userResult.insertId;
        if (type === 'student') {
            const {student_name, student_dob, student_email, student_phone, student_gender} = req.body.formData;
            if (!student_name || !student_dob || !student_email || !student_phone || !student_gender) {
                return res.json('Student details are incomplete.');
            }
            await db.execute(
                'INSERT INTO students (student_name, student_dob, student_email, student_phone, student_gender, user_id) VALUES (?, ?, ?, ?, ?, ?)',
                [student_name, student_dob, student_email, student_phone, student_gender, userId]
            );
        } else if (type === 'admin') {
            const {admin_name,admin_email} = req.body.formData
           
            if (!admin_name || !admin_email) {
                console.log("incomple admin details")
                return res.json('Admin details are incomplete.');
            }
            await db.execute(
                'INSERT INTO admins (admin_name, admin_email, user_id) VALUES (?, ?,?)',
                [admin_name, admin_email, userId]
            );
        } else {
            return res.json('Invalid user type.');
        }
        let users;
        if (type === 'student') {
            users = await db.execute('SELECT * FROM students');
        } else if (type === 'admin') {
            users = await db.execute('SELECT * FROM admins');
        }
        res.status(201).json({ message: 'User registered successfully.', users:users });
    } catch (error) {
        res.json(error)
    }
}