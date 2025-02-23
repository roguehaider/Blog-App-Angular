const jsonServer = require('json-server');
const express = require('express');
const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(express.json()); // to handle JSON data

// Custom endpoint to change the password
app.put('/users/:userId/change-password', (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  // Find the user by id
  const user = router.db.get('users').find({ id: userId }).value();

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  // Check if current password is correct
  if (user.password !== currentPassword) {
    return res.status(400).send({ message: 'Current password is incorrect' });
  }

  // Update password
  user.password = newPassword;

  // Save updated user data
  router.db.get('users').find({ id: userId }).assign(user).write();

  res.status(200).send({ message: 'Password updated successfully' });
});

// Use the router for the rest of the routes
app.use('/api', router);

app.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
