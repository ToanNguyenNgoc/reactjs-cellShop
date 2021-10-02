import React, {useEffect, useState } from 'react';
import {auth} from '../firebase/config'

export const AuthContextClient = React.createContext();
export default function AuthProviderClient({children}){
      const[user, setUser] = useState({});
      useEffect(()=>{
            const unsubscribe = auth.onAuthStateChanged((user)=>{
                  if(user){
                        const {displayName, email, photoURL, uid} = user;
                        setUser({displayName, email, photoURL, uid});
                  }else{
                        setUser({});
                  }
            })
            return ()=>{
                  unsubscribe();
            }
      },[])
      return (
            <AuthContextClient.Provider value={{user}}>
                  {children}
            </AuthContextClient.Provider>
      )
}