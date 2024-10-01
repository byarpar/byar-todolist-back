// src/models/crmModel.js

export const createContactsTable = async (pool) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(100) NOT NULL,
            lastName VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            company VARCHAR(100),
            phone VARCHAR(15),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    
    try {
        await pool.query(createTableQuery);
        console.log('Contacts table created or already exists.');
    } catch (error) {
        console.error('Error creating contacts table:', error);
    }
};

export const dropContactsTable = async (pool) => {
    const dropTableQuery = 'DROP TABLE IF EXISTS contacts';
    
    try {
        await pool.query(dropTableQuery);
        console.log('Contacts table dropped.');
    } catch (error) {
        console.error('Error dropping contacts table:', error);
    }
};
