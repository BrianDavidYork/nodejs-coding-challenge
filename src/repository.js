const users = require('./../data/users.json');
const fs = require('fs');

exports.getUsers = () => {
  return users;
};

exports.createUser = (newUser) => {
  users.push(newUser);
  saveToDisk();
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
    saveToDisk();
    return "User updated!"
  }
};

exports.deleteUser = (email) => {
  const n = users.findIndex((user) => user.email === email);

  if (n !== -1) {
    users.splice(n, 1);
    saveToDisk();
    return "User deleted!"
  }
};

const saveToDisk = () => {
  fs.writeFile('./data/users.json', JSON.stringify(users), 'utf-8', function(err) {
    if (err) throw err;
  })
};