import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';

const AuthContext = React.createContext();
export function useAuth(){
      return useContext(AuthContext);
}
function AuthProvider({children}) {
      const [currentUser, setCurrentUser] = useState();
      function signUp(email, password){
            return auth.createUserWithEmailAndPassword(email, password);
      }
      function signIn(email, password){
            return auth.signInWithEmailAndPassword(email, password);
      }
      function signOut(){
            auth.signOut();
      }
      const value={
            signUp,
            signIn,
            currentUser,
            signOut,
      }
      useEffect(()=>{
            const unsubscribe = auth.onAuthStateChanged(user =>{
                  setCurrentUser(user)
            })
            return unsubscribe
      },[])
      return (
           <AuthContext.Provider
                  value={value}
           >
                 {children}
           </AuthContext.Provider>
      );
}

export default AuthProvider;