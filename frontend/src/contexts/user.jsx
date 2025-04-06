import { createContext } from "react";
import { useUser } from "@utils/data";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { user, isUserLoading, userMutate } = useUser();

    return (
        <UserContext.Provider value={{ user, isUserLoading, userMutate }}>
            {children}
        </UserContext.Provider>
    );
};
