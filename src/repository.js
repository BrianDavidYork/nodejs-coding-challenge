const users = require('./../data/users.json');
const fs = require('fs');

exports.getUsers = () => {
  return users;
};

exports.createUser = (newUser) => {
  uniqueEmailCheck(newUser.email);
  users.push(newUser);
  saveToDisk();
  return "New user created!"
};

exports.updateUser = (email, newInfo) => {
  if (newInfo.email) {
    uniqueEmailCheck(newInfo.email);
  }
  const n = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

  if (n !== -1) {
    newInfo.email = newInfo.email !== undefined ? newInfo.email : users[n].email;
    newInfo.name = newInfo.name !== undefined ? newInfo.name : users[n].name;
    newInfo.dateOfBirth = newInfo.dateOfBirth !== undefined ? newInfo.dateOfBirth : users[n].dateOfBirth;
    newInfo.phoneNumber = newInfo.phoneNumber !== undefined ? newInfo.phoneNumber : users[n].phoneNumber;
    newInfo.address = newInfo.address !== undefined ? newInfo.address : users[n].address;

    users[n] = newInfo;
    saveToDisk();
    return "User updated!"
  } else {
    return "No user with that email!"
  }
};

exports.deleteUser = (email) => {
  const n = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

  if (n !== -1) {
    users.splice(n, 1);
    saveToDisk();
    return "User deleted!"
  } else {
    return "No user with that email!"
  }
};

const saveToDisk = () => {
  fs.writeFile('./data/users.json', JSON.stringify(users), 'utf-8', function(err) {
    if (err) throw err;
  })
};

const uniqueEmailCheck = (newEmail) => {
  const n = users.findIndex((user) => user.email.toLowerCase() === newEmail.toLowerCase());

  if (n !== -1) {
    return "User already exists with that email!"
  }
};