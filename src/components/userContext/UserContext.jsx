import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

function UserContextProvider({ children }) {
    const [loggedInUsername, setLoggedInUsername] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
                    headers: {
                        "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
                        "Access-Control-Allow-Method": "GET",
                    },
                    withCredentials: true,
                });
                setId(response.data.userId);
                setLoggedInUsername(response.data.username);
            } catch (error) {
                console.log("Error", error)
            }
        }
        getData();
    }, [])

    return (
        <UserContext.Provider value={{ loggedInUsername, setLoggedInUsername, id, setId }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
export { UserContext }