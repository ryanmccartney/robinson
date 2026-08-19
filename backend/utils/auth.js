const logger = require("@utils/logger")(module);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const usersModel = require("@models/users");
const getError = require("@utils/error-get");

const authRestrict = require("@utils/auth-restrict");
const authRoles = require("@utils/auth-roles");
const authSession = require("@utils/auth-session");

const BCRYPT_COST_FACTOR = 12;

// Legacy password hashes were unsalted MD5 (32 hex characters). Matched
// here only to support a one-time, transparent migration to bcrypt on next
// successful login - never used for any newly-set password.
const isLegacyMd5Hash = (hash) =>
    typeof hash === "string" && /^[a-f0-9]{32}$/i.test(hash);

const defaultUser = {
    firstName: "Admin",
    lastName: "Admin",
    email: "admin@admin.com",
    username: "admin",
    role: "librarian",
    enabled: true,
    password: bcrypt.hashSync("robinson123", BCRYPT_COST_FACTOR),
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
        return done(null, false, { message: "User does not exist." });
    }

    if (!user.enabled) {
        logger.info(
            `[auth] User '${user?.firstName} ${user?.lastName}' is not enabled.`
        );
        return done(null, false, { message: "User is not enabled." });
    }

    let passwordMatches;

    if (isLegacyMd5Hash(user.password)) {
        passwordMatches =
            user.password ===
            crypto.createHash("md5").update(password).digest("hex");

        if (passwordMatches) {
            // Rehash to bcrypt now that we have the correct plaintext in
            // hand - the account never needs to carry an MD5 hash again.
            user.password = bcrypt.hashSync(password, BCRYPT_COST_FACTOR);
            await user.save();
            logger.info(
                `[auth] Migrated password hash for '${user?.firstName} ${user?.lastName}' from MD5 to bcrypt.`
            );
        }
    } else {
        passwordMatches = bcrypt.compareSync(password, user.password);
    }

    if (!passwordMatches) {
        logger.info(`[auth] Password is incorrect`);
        return done(null, false, { message: "Password incorrect" });
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
