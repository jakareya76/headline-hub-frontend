import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userInfo = { email: currentUser?.email };

      setUser(currentUser);

      if (currentUser) {
        // get token and store it on localstorage
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        //  REMOVE TOKEN
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  return (
    <AuthContext.Provider
      value={{ signUp, loginUser, logoutUser, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
