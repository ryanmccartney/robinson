module.exports = {
    member: {
        name: "Member",
        description: "Browse at your leisure",
        permissions: ["get_data"],
    },
    curator: {
        name: "Curator",
        description: "Organise cases, books and shelves",
        permissions: ["get_data", "update_data", "add_data", "delete_data"],
    },
    librarian: {
        name: "Librarian",
        description: "Configure members",
        permissions: [
            "get_data",
            "update_data",
            "add_data",
            "delete_data",
            "get_user_data",
            "update_user_data",
            "add_user_data",
            "delete_user_data",
        ],
    },
};
