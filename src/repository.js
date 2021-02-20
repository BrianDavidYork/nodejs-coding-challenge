const users = require('./../data/users.json');
const fs = require('fs');

exports.getUsers = () => {
  return {message: null, status: 200, data: users};
};

exports.createUser = (newUser) => {
  uniqueEmailCheck(newUser.email);
  users.push(newUser);
  let err = saveToDisk();
  if (err) {
    return {message: "Could not create user!", status: 500, data: null};
  } else {
    return {message: "New user created!", status: 200, data: null};
  }
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
    let err = saveToDisk();
    if (err) {
      return {message: "Could not update user!", status: 500, data: null};
    } else {
      return {message: "User updated!", status: 200, data: null}
    }
  } else {
    return {message: "No user with that email!", status: 400, data: null}
  }
};

exports.deleteUser = (email) => {
  const n = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase());

  if (n !== -1) {
    users.splice(n, 1);
    let err = saveToDisk();
    if (err) {
      return {message: "Could not delete user!", status: 500, data: null};
    } else {
      return {message: "User deleted!", status: 200, data: null}
    }
  } else {
    return {message: "No user with that email!", status: 400, data: null}
  }
};

const saveToDisk = () => {
  fs.writeFile('./data/users.json', JSON.stringify(users), 'utf-8', function(err) {
    if (err) return err;
  })
};

const uniqueEmailCheck = (newEmail) => {
  const n = users.findIndex((user) => user.email.toLowerCase() === newEmail.toLowerCase());

  if (n !== -1) {
    return {message: "User already exists with that email!", status: 400, data: null};
  }
};