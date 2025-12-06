import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    
    const [user , setUser] = useState("")
    const [token,setToken] = useState(localStorage.getItem("token")||"")

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
    },[token])

    const loginUser = (userData,token) =>{
        setUser(userData)
        setToken(token)
        localStorage.setItem("token",token)
    }

    const logOut = () =>{
        setUser(null)
        setToken("")
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"]
    }
  return (
    <AuthContext.Provider value={{loginUser,logOut,user,token}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext