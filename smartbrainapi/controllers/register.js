const jwtUtils = require('../utils/jwtUtils');
const redisUtils = require('../utils/redisUtils');

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            // JWT token generation and return user data
            const { email, id } = user[0];
            const token = jwtUtils.signToken(email);
            redisUtils.setToken(token, id)
              .then(() => { res.json({ user: user[0], token: token }); })
              .catch(err => console.log(err));
          });
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => { console.log(err); res.status(400).json('unable to register'); })
}

module.exports = {
  handleRegister: handleRegister
};
