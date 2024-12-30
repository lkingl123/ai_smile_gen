// src/app/context/FirebaseAuthContext.tsx

'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Define a type for the context
interface FirebaseAuthContextType {
  user: any | null; // Replace `any` with the actual user type if possible
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create the context
export const FirebaseAuthContext = createContext<FirebaseAuthContextType | null>(null);

// Provide the context
export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null); // Replace `any` with proper type
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <FirebaseAuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

// Create a custom hook to use the context
export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);

  if (!context) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }

  return context;
};
