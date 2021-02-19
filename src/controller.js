const repo = require('./repository');

exports.getUsers = (req, res) => {
  const users = repo.getUsers();
  return res.status(200).send({"data": users});
};

exports.createUser = (req, res) => {};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};