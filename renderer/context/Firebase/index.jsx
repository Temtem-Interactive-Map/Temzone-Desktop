import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect } from "react";

export const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  // Navigation
  const router = useRouter();

  // State
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  auth.onAuthStateChanged((user) => {
    if (user && router.pathname === "/login") {
      router.push("/markers/all");
    }
  });

  useEffect(() => {
    getAnalytics(app);
  }, [app]);

  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}
