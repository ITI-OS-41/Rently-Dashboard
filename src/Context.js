import React, {createContext, useCallback, useState} from "react";


export const UserContext = createContext({});


function Context(props) {
  const {children,...rest} = props;
  const [user, setUser] = useState( JSON.parse(localStorage.getItem('rently-user')) || {});

  return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
  )
}
export default Context;
