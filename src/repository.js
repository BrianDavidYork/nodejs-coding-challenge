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

  newInfo.email = newInfo.email !== undefined ? newInfo.email : users[n].email;
  newInfo.name = newInfo.name !== undefined ? newInfo.name : users[n].name;
  newInfo.dateOfBirth = newInfo.dateOfBirth !== undefined ? newInfo.dateOfBirth : users[n].dateOfBirth;
  newInfo.phoneNumber = newInfo.phoneNumber !== undefined ? newInfo.phoneNumber : users[n].phoneNumber;
  newInfo.address = newInfo.address !== undefined ? newInfo.address : users[n].address;

  if (n !== -1) {
    users[n] = newInfo;
    return "User updated!"
  }
};

exports.deleteUser = (email) => {
  const n = users.findIndex((user) => user.email === email);

  if (n !== -1) {
    users.splice(n, 1);
    return "User deleted!"
  }
};