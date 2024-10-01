import { addNewContact, getContacts, getContactWithID, updateContact, deleteContact } from '../controllers/crmController';

const routes = (app, db) => {
    app.route('/contact')
        .get((req, res, next) => {
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, (req, res) => getContacts(req, res, db))
        .post((req, res) => addNewContact(req, res, db));

    app.route('/contact/:contactId')
        .get((req, res) => getContactWithID(req, res, db))
        .put((req, res) => updateContact(req, res, db))
        .delete((req, res) => deleteContact(req, res, db));
};

export default routes;
