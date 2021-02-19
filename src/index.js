let express = require("express");
let app = express();
const bp = require('body-parser');
const controller = require('./controller');

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// endpoints
app.get('/api/users', controller.getUsers);
app.post('/api/users', controller.createUser);
app.put('/api/users', controller.updateUser);
app.delete('/api/users', controller.deleteUser);

module.exports = app;
