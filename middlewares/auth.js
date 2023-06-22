module.exports = (req, res, next) => {
    if (req.isAuthenticated()){
      res.locals.isLoggedIn = true;
      return next();
    } else {
      res.locals.isLoggedIn = false;
      res.redirect("/login");
    }
};