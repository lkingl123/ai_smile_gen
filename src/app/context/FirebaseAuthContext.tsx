'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Define the shape of the auth context
interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Create the context with default null value
export const FirebaseAuthContext = createContext<FirebaseAuthContextType | null>(null);

// Provider component to wrap around your app
export const FirebaseAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && !currentUser.emailVerified) {
        // Optional: prevent unverified users from staying signed in
        await firebaseSignOut(auth);
        setUser(null);
      } else {
        setUser(currentUser);
      }
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

// Custom hook to access Firebase auth context
export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }
  return context;
};
