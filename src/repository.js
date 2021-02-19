const users = require('./../data/users.json');

exports.getUsers = () => {
  return users;
};

exports.createUser = (newUser) => {
  users.push(newUser);
  return "New user created!"
};