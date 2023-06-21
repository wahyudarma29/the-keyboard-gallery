const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaClient } = require("@prisma/client");
const { compareHash } = require("./bcrypt");

const prisma = new PrismaClient();

async function authenticate(username, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    
    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    return done(null, user);
  } catch (err) {
    return done(null, false, { message: err.message });
  }
}

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    authenticate
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) =>
  done(null, await prisma.user.findUnique({ where: { id } }))
);
module.exports = passport;