import React from "react";

export const UserContext = React.createContext({
    tableRows:null,
    values:null

});

export function UserContextProvider({children}){
    return(
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
}