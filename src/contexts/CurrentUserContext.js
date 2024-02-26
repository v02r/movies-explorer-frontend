import React, {createContext, useContext, useState} from "react";

const CurrentUserContext = createContext({
        token: localStorage.getItem("jwt"),
        name: "",
        email: "",
});

function useCurrentUser() {
    return useContext(CurrentUserContext);
}

export { CurrentUserContext, useCurrentUser };
