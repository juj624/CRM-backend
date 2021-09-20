

const getAllUsers = (_req, res) => {
    res.json({
        status: 'ok',
        data: users,
    });
};

const getOneUser = (_req, res) => {
    res.json({
        status: 'ok',
        data: user,
    });
};

const getAllContacts = (_req, res) => {
    res.json({
        status: 'ok',
        data: contacts,
    });
};

const getOneContact = (_req, res) => {
    res.json({
        status: 'ok',
        data: contact,
    });
}



module.exports = {
    getAllUsers: getAllUsers,
    getOneUser: getOneUser,
    getAllContacts: getAllContacts,
    getOneContact: getOneContact,

}