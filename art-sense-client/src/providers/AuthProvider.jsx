import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged,  sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { app } from "../firebase/firebase.config";
import axios from "axios";



export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }
  // send validation email
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log("auth state change", currentUser);
      setUser(currentUser);

      // get and set token
      if (currentUser) {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/jwt`, { email: currentUser.email })
          .then(data => {
            localStorage.setItem('access-token', data.data.token);
            setLoading(false);
          })
      }
      else {
        localStorage.removeItem('access-token')
      }
    });
    return () => {
      return unsubscribe();
    }
  }, [])
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    resetPassword,
    logOut,
    updateUserProfile,
    googleSignIn,

  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;