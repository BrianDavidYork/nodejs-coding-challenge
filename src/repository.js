const users = require('./../data/users.json');

exports.getUsers = () => {
  return users;
};

exports.createUser = (newUser) => {
  users.push(newUser);
  return "New user created!"
};

exports.updateUser = (email, newInfo) => {
  const n = users.findIndex((user) => user.email === email);

  if (n !== -1) {
    users[n] = newInfo;
    return "User updated!"
  }
};