const getInitials = (name) => {
    if (!name) {
        return "";
    }

    let initials = "";
    const nameArray = name.split(" ");
    for (const word of nameArray) {
        initials += word.charAt(0);
    }
    return initials.toUpperCase();
};

export default getInitials;
