import React, {createContext, useEffect, useState} from "react";
import {get, patch} from "./functions/request";


export const UserContext = createContext({});


function Context(props) {


    const {children, ...rest} = props;
    const [demmy, setDummy] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('rently-user')) || {});


    //get user location and save it to profile
    useEffect(() => {
        if (user.username) {
            get(`/user/infor`)
                .then(res=>{
                    setUser({
                        ...user,
                        ...res.data
                    })

                })
                .catch(e=>{console.log(e)})
        }
    }, [demmy]);


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}


export default Context;
