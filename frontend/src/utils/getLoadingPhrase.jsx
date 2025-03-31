const getLoadingPhrase = () => {
    const phrases = [
        "Speaking with our librarian",
        "Sending you on your way",
        "Getting our ducks in a row",
        "Dewey decimals pending",
        "Gathering geese",
        "Looking for our place",
    ];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    return randomPhrase;
};

export default getLoadingPhrase;
