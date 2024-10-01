import { ContactModel } from '../models/crmModel';

export const addNewContact = async (req, res, db) => {
    const contactModel = new ContactModel(db);
    try {
        const contact = await contactModel.addContact(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const getContacts = async (req, res, db) => {
    const contactModel = new ContactModel(db);
    try {
        const contacts = await contactModel.getAllContacts();
        res.json(contacts);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const getContactWithID = async (req, res, db) => {
    const contactModel = new ContactModel(db);
    try {
        const contact = await contactModel.getContactById(req.params.contactId);
        res.json(contact);
    } catch (err) {
        res.status(404).send({ message: err.message });
    }
};

export const updateContact = async (req, res, db) => {
    const contactModel = new ContactModel(db);
    try {
        const contact = await contactModel.updateContact(req.params.contactId, req.body);
        res.json(contact);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export const deleteContact = async (req, res, db) => {
    const contactModel = new ContactModel(db);
    try {
        const message = await contactModel.deleteContact(req.params.contactId);
        res.json(message);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
