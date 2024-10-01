export const getContacts = async (req, res, pool) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts');
        res.json(rows);
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        res.status(500).send({ message: 'Error retrieving contacts', error: err.message });
    }
};

export const addNewContact = async (req, res, pool) => {
    try {
        const { firstName, lastName, email, company, phone } = req.body;
        const [result] = await pool.query(
            'INSERT INTO contacts (firstName, lastName, email, company, phone) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, company, phone]
        );
        const newContact = { id: result.insertId, firstName, lastName, email, company, phone };
        res.status(201).json(newContact);
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send({ message: 'Error saving contact', error: err.message });
    }
};

export const getContactWithID = async (req, res, pool) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [req.params.contactId]);
        if (rows.length === 0) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('Error retrieving contact:', err);
        res.status(500).send({ message: 'Error retrieving contact', error: err.message });
    }
};

export const updateContact = async (req, res, pool) => {
    try {
        const { firstName, lastName, email, company, phone } = req.body;
        const [result] = await pool.query(
            'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, company = ?, phone = ? WHERE id = ?',
            [firstName, lastName, email, company, phone, req.params.contactId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Error updating contact:', err);
        res.status(500).send({ message: 'Error updating contact', error: err.message });
    }
};

export const deleteContact = async (req, res, pool) => {
    try {
        const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.contactId]);
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error('Error deleting contact:', err);
        res.status(500).send({ message: 'Error deleting contact', error: err.message });
    }
};
