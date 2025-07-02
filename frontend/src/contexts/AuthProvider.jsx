import { useState } from "react"
import { CreateContext } from "./CreateContext";

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);

    const login=(data)=>{
        setUser(data);
    }
    const logout=()=>{
        setUser(null);
    }

  return (
    <>
    <CreateContext.Provider value={{user,login,logout}}>
        {children}
    </CreateContext.Provider>
    </>
  )
}

export default  AuthProvider