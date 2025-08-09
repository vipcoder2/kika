import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const authService = {
  // Sign in with email and password
  async signIn(email: string, password: string): Promise<FirebaseUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  },

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  },

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};