import React,{createContext,useState} from 'react'


export const LoggedUserContext = createContext()


const LoggedUserProvider = ({children}) => {

    const [loggedUser,setLoggedUser] = useState("")


    const handleSetLoggedUser = user => setLoggedUser(user)

    const values = {
        loggedUser,
        handleSetLoggedUser
    }

    return (
        <LoggedUserContext.Provider value={values}>
            {children}
        </LoggedUserContext.Provider>
    )
}

export default LoggedUserProvider
