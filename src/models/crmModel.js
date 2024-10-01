export class ContactModel {
    constructor(db) {
        this.db = db;
    }

    async addContact(contactData) {
        const { firstName, lastName, email, company, phone } = contactData;
        try {
            const [result] = await this.db.execute(
                'INSERT INTO contacts (firstName, lastName, email, company, phone) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, email, company, phone]
            );
            return { id: result.insertId, firstName, lastName, email, company, phone };
        } catch (error) {
            throw new Error('Error adding contact');
        }
    }

    async getAllContacts() {
        try {
            const [contacts] = await this.db.query('SELECT * FROM contacts');
            return contacts;
        } catch (error) {
            throw new Error('Error retrieving contacts');
        }
    }

    async getContactById(contactId) {
        try {
            const [contact] = await this.db.query('SELECT * FROM contacts WHERE id = ?', [contactId]);
            if (contact.length === 0) {
                throw new Error('Contact not found');
            }
            return contact[0];
        } catch (error) {
            throw new Error('Error retrieving contact');
        }
    }

    async updateContact(contactId, contactData) {
        const { firstName, lastName, email, company, phone } = contactData;
        try {
            const [result] = await this.db.execute(
                'UPDATE contacts SET firstName = ?, lastName = ?, email = ?, company = ?, phone = ? WHERE id = ?',
                [firstName, lastName, email, company, phone, contactId]
            );
            if (result.affectedRows === 0) {
                throw new Error('Contact not found');
            }
            return { id: contactId, firstName, lastName, email, company, phone };
        } catch (error) {
            throw new Error('Error updating contact');
        }
    }

    async deleteContact(contactId) {
        try {
            const [result] = await this.db.execute('DELETE FROM contacts WHERE id = ?', [contactId]);
            if (result.affectedRows === 0) {
                throw new Error('Contact not found');
            }
            return { message: 'Contact deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting contact');
        }
    }
}
