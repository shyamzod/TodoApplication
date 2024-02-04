const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = zod.object({ username: zod.string(), password: zod.string() });
const SecretKey = "12345678";
function GenerateToken(obj) {
  const token = jwt.sign(obj, SecretKey);
  return token;
}
function AuthUser(req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const valid = User.safeParse({ username, password });
    if (valid.success) {
      next();
    } else {
      res.send("Wrong Input Provided..");
    }
  } catch (err) {
    res.Send(err);
  }
}

module.exports = { AuthUser, GenerateToken };
