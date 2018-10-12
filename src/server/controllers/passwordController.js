bcrypt.compare(password, user.password)
  .then(isMatch => {
    if (isMatch) {
      res.json({ message: 'Success' });
    } else {
      return res.status(400).json({ password: 'Password Incorrect' });
    }
  });

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newUser.password, salt, (err, hash) => {
    if (err) throw err;
    newUser.password = hash;
    // Save new User to database
    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});
