const getInitials = (name) => {
    let initials = "";
    const nameArray = name.split(" ");
    if (name) {
        for (let word of nameArray) {
            initials += word.charAt(0);
        }
        return initials.toUpperCase();
    }
};

export default getInitials;
