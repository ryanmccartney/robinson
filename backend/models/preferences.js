const usersModel = require("@models/users");

const parsePreference = (preferences) => {
    if (Array.isArray(preferences) && preferences.length > 0) {
        return preferences[0];
    }
    return {};
};

const makeQueryObject = (update = {}) => {
    const updateObject = {};
    for (const [key, value] of Object.entries(update)) {
        updateObject[key] = value;
    }
    return updateObject;
};

const makePreferencesQueryObject = (update = {}) => {
    const updateObject = { preferences: { $elemMatch: {} } };
    for (const [key, value] of Object.entries(update)) {
        updateObject.preferences.$elemMatch[key] = value;
    }
    return updateObject;
};

const makePreferencesUpdateObject = (update = {}) => {
    const updateObject = {};
    for (const [key, value] of Object.entries(update)) {
        updateObject[`preferences.${key}`] = value;
    }
    return updateObject;
};

const findOnePreference = async (userId, query = {}) => {
    if (userId && query) {
        const preferences = await usersModel
            .findOne(
                {
                    userId: userId,
                    ...makePreferencesQueryObject(query),
                },
                { "preferences.$": 1 }
            )
            .lean();
        return parsePreference(preferences?.preferences);
    }
    return {};
};

const findFavourites = async (userId) => {
    if (userId) {
        const data = await usersModel.aggregate([
            { $match: { userId: userId } },
            {
                $project: {
                    preferences: {
                        $filter: {
                            input: "$preferences",
                            as: "pref",
                            cond: { $eq: [`$$pref.favourite`, true] },
                        },
                    },
                },
            },
        ]);

        return data[0].preferences;
    }
    return {};
};

const findProgress = async (userId, threshold = 0) => {
    if (userId) {
        const data = await usersModel.aggregate([
            { $match: { userId: userId } },
            {
                $project: {
                    preferences: {
                        $filter: {
                            input: "$preferences",
                            as: "pref",
                            cond: { $gt: [`$$pref.progress`, threshold] },
                        },
                    },
                },
            },
        ]);

        return data[0].preferences;
    }
    return {};
};

const findOneAndUpdatePreferences = async (userId, query = {}, update = {}) => {
    if (userId && query) {
        let preference = await usersModel.findOneAndUpdate(
            {
                userId: userId,
                ...makePreferencesUpdateObject(query),
            },
            {
                $set: {
                    "preferences.$.favourite": update.favourite,
                    "preferences.$.rating": update.rating,
                    "preferences.$.progress": update.progress,
                },
            },
            {
                new: true,
                lean: true,
                "preferences.$": 1,
            }
        );

        if (!preference) {
            preference = await usersModel.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        preferences: {
                            favourite: update.favourite,
                            rating: update.rating,
                            progress: update.progress,
                            ...makeQueryObject(query),
                        },
                    },
                },
                {
                    new: true,
                    lean: true,
                    "preferences.$": 1,
                }
            );
        }

        return parsePreference(preference.preferences);
    }
    return {};
};

module.exports = {
    findOne: findOnePreference,
    findOneAndUpdate: findOneAndUpdatePreferences,
    findFavourites,
    findProgress,
};
