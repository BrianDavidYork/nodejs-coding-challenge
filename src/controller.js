const repo = require('./repository');

exports.getUsers = (req, res) => {
  let users = repo.getUsers();

  // search
  const search = req.query.match;
  if (search !== undefined) {
    const searchResults = users.find(u => u.email.toLowerCase() === search.email.toLowerCase());
    if (searchResults !== undefined) {
      return res.status(200).send({"message": "1 user returned","data": [searchResults]});
    } else {
      return res.status(200).send({"message": "0 users returned","data": []});
    }
  }

  // sort
  const sortBy = req.query.sortBy;
  const sortDirection = req.query.sortDirection;
  if (sortBy !== undefined) {
    if (sortDirection === "descending") {
      users.sort((a, b) => (a[sortBy] < b[sortBy]) ? 1 : -1);
    } else {
      users.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);
    }
  }

  // pagination
  const page = req.query.page;
  const limit = req.query.limit;
  if (page !== undefined && limit !== undefined) {
    users = users.slice((page * limit) - limit, page * limit)
  }

  return res.status(200).send({"message": users.length + " users returned","data": users});
};

exports.createUser = (req, res) => {
  const newUser = req.body;

  // request validation
  if (!(newUser.email && newUser.name && newUser.dateOfBirth && newUser.phoneNumber && newUser.address)) {
    return res.status(200).send({"message": "New users must have email, name, dateOfBirth, phoneNumber, and address","data": null});
  }

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