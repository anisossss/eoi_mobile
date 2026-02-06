/**
 * CSIR EOI 8119 - Firebase Configuration
 * Demonstrates Firebase SDK integration in React Native/Expo
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

// Firebase configuration
// In production, these would come from environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || 'csir-eoi-8119-demo.firebaseapp.com',
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || 'csir-eoi-8119-demo',
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || 'csir-eoi-8119-demo.appspot.com',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef',
};

// Initialize Firebase (singleton pattern)
let firebaseApp: FirebaseApp;

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize services
const db: Firestore = getFirestore(firebaseApp);
const auth: Auth = getAuth(firebaseApp);

export { firebaseApp, db, auth };
