import { createContext } from "react";

export const UserContext = createContext(
    {
        id: null,
        name: null,
        email:null,
        cartNum: null,
        loading: false,
        cartInfo: null,
    }
);