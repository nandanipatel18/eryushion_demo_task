const db = require('../DBconfig')

exports.getAllStudents = async (req, res) => {
    try {
        console.log("get stu")
        const query = 'SELECT * FROM students';
        let [students] = await db.execute(query)
        res.json(students);
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.addStudent = async (req, res) => {
    try {
        const { student_name, student_dob, student_gender, student_email, student_phone } = req.body;
        const query = `INSERT INTO students (student_name, student_dob, student_gender, student_email, student_phone) 
                       VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.execute(query, [student_name, student_dob, student_gender, student_email, student_phone]);
        res.json({ message: 'Student created successfully' });
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.getStudent = async (req, res) => {
    try {
        console.log(req.params)
        const {id} = req.params;
        const [student] = await db.execute('SELECT * FROM students WHERE user_id = ?',[id])
        if (student.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student[0]);
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const { student_name, student_dob, student_gender, student_email, student_phone } = req.body
        const [result] = await db.query('UPDATE students SET student_name = ?, student_dob = ?, student_gender = ?, student_email = ?, student_phone = ? WHERE id = ?', [student_name, student_dob, student_gender, student_email, student_phone, id])
        if (result.affectedRows === 0) {
            return res.json({ message: 'Student not found.' });
        }
        const [updatedStudent] = await db.query('SELECT id, student_name, student_email, student_phone, student_dob, student_gender FROM students WHERE id = ?', [id]);

        res.json(updatedStudent[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM students WHERE user_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        await db.query('DELETE FROM users WHERE id = ?', [id]); 
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting student.' });
    }
};