let express = require("express");
let app = express();
const controller = require('./controller');

app.listen(8000, () => {
  console.log("Server running on port 3000");
});

// endpoints
app.get('/api/users', controller.getUsers);
app.post('/api/users', controller.createUser);
app.put('/api/users', controller.updateUser);
app.delete('/api/users', controller.deleteUser);

module.exports = app;
