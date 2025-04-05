import { createContext, useState, useEffect } from "react";
import fetcher from "@utils/fetcher";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        const data = await fetcher("users/current");
        if (data.user) {
            setUser(data.user);
        }
    };

    //On component Mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
