const response = require("@utils/response");
const roles = require("@utils/auth-roles");
const getError = require("@utils/error-get");
const usersModel = require("@models/users");

const checkRoles = (permissions = [], roleName = "guest") => {
    const role = roles[roleName];

    for (let permission of permissions) {
        if (role.permissions.includes(permission)) {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = (permissions = []) => {
    const checkCredentials = async (req, res, next) => {
        try {
            //Check if user has been authenticated by passport
            if (await req.isAuthenticated()) {
                //Gets up to date info on the user from service
                const user = await usersModel.findOne({ userId: req.user });

                //Check if the user is still enabled
                if (!user?.enabled) {
                    req.logout((err) => {
                        if (err) {
                            return next(err);
                        }
                        throw new Error(`You're not authorised, speak to an admin.`);
                    });
                }

                //Check if the user has the correct roles
                if (!checkRoles(permissions, user?.role)) {
                    throw new Error(`You don't have a suitable role to access this resource.`);
                }
            } else {
                //If there's no user at all
                throw new Error(`Not logged in.`);
            }

            //If we've got to this point the user is shall pass
            return next();
        } catch (error) {
            response(res, req, { ...{ user: req?.user }, ...getError(error, 403) });
        }
    };
    return checkCredentials;
};
