import {
    addNewContact,
    getContacts,
    getContactWithID,
    updateContact,
    deleteContact,
} from '../controllers/crmController.js';

const routes = (app, pool) => {
    app.route('/contact')
        .get((req, res) => getContacts(req, res, pool))
        .post((req, res) => addNewContact(req, res, pool));

    app.route('/contact/:contactId')
        .get((req, res) => getContactWithID(req, res, pool))
        .put((req, res) => updateContact(req, res, pool))
        .delete((req, res) => deleteContact(req, res, pool));
};

export default routes;
