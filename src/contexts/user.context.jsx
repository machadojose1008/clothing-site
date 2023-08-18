import {createContext, useState} from 'react';



// Valor que deseja acessar
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Provedor ( o componente )
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}


