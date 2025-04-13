const formatQuantity = (items, singleString, pruralString) => {
    if (!isNaN(items)) {
        if (items === 1) {
            return `${items} ${singleString}`;
        }
        return `${items} ${pruralString ? pruralString : `${singleString}s`}`;
    }
    return `0 ${pruralString ? pruralString : `${singleString}s`}`;
};

export default formatQuantity;
