import React, { useState } from 'react';
import UserContext from './UserContext';

const GlobalState = ({children}) => {
    const [userSignIn, setUserSignIn] = useState(localStorage.getItem("signIn"));
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));

    const signInUser = (user) => {
        console.log(user)
        setUserInfo(user);
        localStorage.setItem("user",JSON.stringify(user))
        setUserSignIn(true);
        localStorage.setItem("signIn",true)
    };

    const signOutUser = () => {
        setUserSignIn(false);
        setUserInfo();
        localStorage.removeItem("signIn")
        localStorage.removeItem("user")
    };


    return(
        <UserContext.Provider value={{
            userSignIn,
            signInUser,
            signOutUser,
            userInfo,
        }}>
            {children}
        </UserContext.Provider>
    )
};

export default GlobalState;