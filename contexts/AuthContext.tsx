/**
 * CSIR EOI 8119 - Authentication Context
 * Demonstrates Firebase Auth integration
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

import { firebaseApp } from "@/services/firebase";

interface User {
  uid: string;
  email: string | null;
  displayName: string;
  role: string;
  department: string;
  mineSection: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: Partial<User>
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    // Check for stored user on app start
    const loadStoredUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error loading stored user:", error);
      }
    };

    loadStoredUser();

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data(),
            } as User;
            setUser(userData);
            await SecureStore.setItemAsync("user", JSON.stringify(userData));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUser(null);
        await SecureStore.deleteItemAsync("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userDoc = await getDoc(doc(db, "users", credential.user.uid));

      if (userDoc.exists()) {
        const userData = {
          uid: credential.user.uid,
          email: credential.user.email,
          ...userDoc.data(),
        } as User;
        setUser(userData);
        await SecureStore.setItemAsync("user", JSON.stringify(userData));
      }
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign in");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: Partial<User>
  ) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create user profile in Firestore
      const userProfile = {
        email,
        displayName: userData.displayName || "",
        role: userData.role || "operator",
        department: userData.department || "",
        mineSection: userData.mineSection || "",
        createdAt: new Date(),
        isActive: true,
      };

      await setDoc(doc(db, "users", credential.user.uid), userProfile);

      const fullUser = {
        uid: credential.user.uid,
        ...userProfile,
      } as User;

      setUser(fullUser);
      await SecureStore.setItemAsync("user", JSON.stringify(fullUser));
    } catch (error: any) {
      throw new Error(error.message || "Failed to create account");
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      await SecureStore.deleteItemAsync("user");
    } catch (error: any) {
      throw new Error(error.message || "Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
