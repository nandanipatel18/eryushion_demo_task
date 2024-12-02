const db = require('../DBconfig')

exports.getAllAdmins = async (req, res) => {
    try {
        console.log("get admin")
        const query = 'SELECT * FROM admins';
        let [admins] = await db.execute(query)
        res.json(admins);
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { admin_name, admin_email } = req.body
        const [result] = await db.execute('UPDATE admins SET admin_name = ?, admin_email = ? WHERE id = ?', [admin_name, admin_email, id])
        if (result.affectedRows === 0) {
            return res.json({ message: 'Admin not found.' });
        }
        const [updatedAdmin] = await db.query('SELECT id, admin_name, admin_email FROM admins WHERE id = ?', [id]);
        res.json(updatedAdmin[0]);
    } catch (error) {
        console.log(error)
        res.json({ error: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM admins WHERE user_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        await db.query('DELETE FROM admins WHERE id = ?', [id]);
        res.json({ message: 'Admin deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Admin.' });
    }
};