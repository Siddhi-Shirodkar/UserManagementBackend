const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors'); 
app.use(cors()); 
app.use(express.json());    // JSON parsing

let users = [];   // data of the users 


app.get('/users', (req, res) => {         //you get all the users
  res.json(users);
});


app.get('/users/:id', (req, res) => {     // you get the  specific user
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.post('/users', (req, res) => {      // this is the Route for creating a new user
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {     //to Update the User
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.delete('/users/:id', (req, res) => {           // To delete the user
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
