const passport = require("../helper/passport")

class AuthController {
  static loginPage (req, res) {
    if (req.isAuthenticated()) return res.redirect("/")

    res.render("pages/login")
  }

  static async login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  static async logout (req, res, next) {
    req.logout(err => {
      if (err) {
        return next(err)
      }
      res.redirect("/login")
    })
  }
}

module.exports = AuthController