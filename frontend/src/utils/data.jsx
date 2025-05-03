import fetcher from "@utils/fetcher";
import useSWR from "swr";

const uppercaseFirst = (string) => {
    const firstLetter = string.substr(0, 1);
    return firstLetter.toUpperCase() + string.substr(1);
};

const useData = (
    pathKey,
    {
        pathKeyId = null,
        inputDataKey = null,
        showErrorMessages = true,
        filter = {},
    } = {}
) => {
    const params = new URLSearchParams(filter);
    const dataKey = inputDataKey ? inputDataKey : pathKey;
    const dataKeyUppercase = uppercaseFirst(dataKey);
    let path = pathKeyId ? `${pathKey}/${pathKeyId}` : pathKey;
    path += params.size > 0 ? `?${params}` : "";
    const { data, error, isLoading, mutate } = useSWR(
        path,
        (path, body, method) => {
            return fetcher(path, body, method, showErrorMessages);
        }
    );

    return {
        [dataKey]: data?.[dataKey],
        [`is${dataKeyUppercase}Loading`]: isLoading,
        [`${dataKey}Error`]: error,
        [`${dataKey}Mutate`]: mutate,
    };
};

const useBooks = (filter) => {
    return useData("books", { filter });
};

const useShelves = (filter) => {
    return useData("shelves", { filter });
};

const useCases = (filter) => {
    return useData("cases", { filter });
};

const useUsers = (filter) => {
    return useData("users", { filter });
};

const useBook = (bookId) => {
    return useData("books", { pathKeyId: bookId, inputDataKey: "book" });
};

const useShelf = (shelfId) => {
    return useData("shelves", { pathKeyId: shelfId, inputDataKey: "shelf" });
};

const useCase = (caseId) => {
    return useData("cases", { pathKeyId: caseId, inputDataKey: "case" });
};

const useUser = () => {
    return useData("users", {
        pathKeyId: "current",
        inputDataKey: "user",
        showErrorMessages: false,
    });
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
