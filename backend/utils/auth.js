const logger = require("@utils/logger")(module);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const md5 = require("md5");

const usersModel = require("@models/users");
const getError = require("@utils/error-get");
const data = require("@utils/response");

const authRestrict = require("@utils/auth-restrict");
const authRoles = require("@utils/auth-roles");
const authSession = require("@utils/auth-session");

const defaultUser = {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    username: "admin",
    role: "admin",
    enabled: true,
    password: "0192023a7bbd73250516f069df18b500",
};

const initUsers = async () => {
    try {
        const users = await usersModel.find();
        let user = {};

        if (users.length < 1) {
            user = new usersModel(defaultUser);
            await user.save();
            logger.info(`Add default user with ID ${user.userId}`);
        }

        return { user: user };
    } catch (error) {
        return getError(error);
    }
};

const strategy = new LocalStrategy(async (username, password, done) => {
    const user = await usersModel.findOne({ username: username });

    console.log(user);
    console.log(password);
    console.log(md5(password));
    if (!user) {
        logger.info(`[auth] User '${username}' does not exist.`);
        return done(new Error(`[auth] User with '${username}' does not exist.`), false);
    }

    if (!user.enabled) {
        logger.info(`[auth] User '${user?.firstName} ${user?.lastName}' is not enabled.`);
        return done(new Error(`[auth] User '${user?.firstName} ${user?.lastName}' is not enabled.`), false);
    }

    logger.info(`[auth] ${user?.firstName} ${user?.lastName} logged in.`);
    return done(null, user.userId);
});

const authenticate = async (req, res, next) => {
    passport.authenticate("local", async (error, userId, info) => {
        try {
            if (error) {
                throw error;
            } else {
                req.user = userId;
                next();
            }
        } catch (error) {
            return response(res, req, { ...{ user: userId }, ...getError(error, 401) });
        }
    })(req, res, next);
};

module.exports = {
    strategy: strategy,
    authenticate: authenticate,
    initUsers: initUsers,
    restrict: authRestrict,
    roles: authRoles,
    session: authSession,
};
