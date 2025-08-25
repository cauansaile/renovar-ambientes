const bcrypt = require('bcrypt');

const password = 'yourAdminPassword';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Your hashed password is:\n', hash);
});
