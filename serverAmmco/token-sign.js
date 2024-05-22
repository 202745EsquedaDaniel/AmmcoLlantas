const jwt = require('jsonwebtoken');

const secret = 'P1zzaHut';
const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token); //
