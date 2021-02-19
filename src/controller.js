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

exports.updateUser = (req, res) => {
  const email = req.params.email;
  const updatedUserInfo = req.body;

  const repoResponse = repo.updateUser(email, updatedUserInfo);
  return res.status(200).send({"message": repoResponse, data: null});
};

exports.deleteUser = (req, res) => {
  const email = req.params.email;
  const repoResponse = repo.deleteUser(email);
  return res.status(200).send({"message": repoResponse, data: null});
};