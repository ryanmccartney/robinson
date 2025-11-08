const logger = require("@utils/logger")(module);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");

const usersModel = require("@models/users");
const getError = require("@utils/error-get");

const authRestrict = require("@utils/auth-restrict");
const authRoles = require("@utils/auth-roles");
const authSession = require("@utils/auth-session");

const defaultUser = {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    username: "admin",
    role: "librarian",
    enabled: true,
    password: crypto.createHash("md5").update("robinson123").digest("hex"),
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

    if (!user) {
        logger.info(`[auth] User '${username}' does not exist.`);
        return done(new Error(`User does not exist.`), false);
    }

    if (!user.enabled) {
        logger.info(
            `[auth] User '${user?.firstName} ${user?.lastName}' is not enabled.`
        );
        return done(new Error(`User is not enabled.`), false);
    }

    if (
        user.password != crypto.createHash("md5").update(password).digest("hex")
    ) {
        logger.info(`[auth] Password is incorrect`);
        return done(new Error(`Password incorrect`), false);
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
            return response(res, req, {
                ...{ user: userId },
                ...getError(error, 401),
            });
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
