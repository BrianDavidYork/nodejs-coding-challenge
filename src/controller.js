const repo = require('./repository');

exports.getUsers = (req, res) => {
  const users = repo.getUsers();
  return res.status(200).send({"message": users.length + " users returned","data": users});
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  const repoResponse = repo.createUser(newUser);
  return res.status(200).send({"message": repoResponse, data: null});
};

exports.updateUser = (req, res) => {};

exports.deleteUser = (req, res) => {};