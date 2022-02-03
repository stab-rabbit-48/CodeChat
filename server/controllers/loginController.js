const loginController = {};

loginController.grabUser = (req, res, next) => {
    res.locals.user = req.cookies;
    next();
}

module.exports = loginController;