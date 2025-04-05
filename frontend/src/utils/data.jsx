import fetcher from "@utils/fetcher";
import useSWR from "swr";

const uppercaseFirst = (string) => {
    const firstLetter = string.substr(0, 1);
    return firstLetter.toUpperCase() + string.substr(1);
};

const useData = (pathKey, pathKeyId, inputDataKey) => {
    const dataKey = inputDataKey ? inputDataKey : pathKey;
    const dataKeyUppercase = uppercaseFirst(dataKey);
    const path = pathKeyId ? `${pathKey}/${pathKeyId}` : pathKey;
    const { data, error, isLoading, mutate } = useSWR(path, fetcher);

    return {
        [dataKey]: data?.[dataKey],
        [`is${dataKeyUppercase}Loading`]: isLoading,
        [`${dataKey}Error`]: error,
        [`${dataKey}Mutate`]: mutate,
    };
};

const useBooks = () => {
    return useData("books");
};

const useShelves = () => {
    return useData("shelves");
};

const useCases = () => {
    return useData("cases");
};

const useUsers = () => {
    return useData("users");
};

const useBook = (bookId) => {
    return useData("books", bookId, "book");
};

const useShelf = (shelfId) => {
    return useData("shelves", shelfId, "shelf");
};

const useCase = (caseId) => {
    return useData("cases", caseId, "case");
};

const useUser = (userId) => {
    return useData("users", userId, "user");
};

export {
    useBooks,
    useShelves,
    useCases,
    useUsers,
    useBook,
    useShelf,
    useCase,
    useUser,
};
