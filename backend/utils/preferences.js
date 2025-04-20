const usersModel = require("@models/users");

const parsePreference = (data) => {
    if (Array.isArray(data?.preferences) && data?.preferences.length > 0) {
        return data?.preferences[0];
    }
    return {};
};

const getPreferences = async (bookId, userId) => {
    if (bookId && userId) {
        const preference = await usersModel
            .findOne(
                { userId: userId, "preferences.bookId": bookId },
                { "preferences.$": 1 }
            )
            .lean();
        return parsePreference(preference);
    }
    return {};
};

const updatePreferences = async (bookId, userId, update = {}) => {
    if (userId && bookId) {
        let preference = await usersModel.findOneAndUpdate(
            {
                userId: userId,
                "preferences.bookId": bookId,
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
                            bookId: bookId,
                            favourite: update.favourite,
                            rating: update.rating,
                            progress: update.progress,
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

        return parsePreference(preference);
    }
    return {};
};

module.exports = {
    default: getPreferences,
    get: getPreferences,
    update: updatePreferences,
};
