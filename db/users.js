let users = [];

module.exports = {
    users,
    addUser: (user) => users.push(user),
    findUser: (email) => users.find(u => u.email === email)
};