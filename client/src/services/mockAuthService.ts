// Mock authentication service for testing
interface MockUser {
  uid: string;
  email: string;
}

let currentUser: MockUser | null = null;
let authStateListeners: ((user: MockUser | null) => void)[] = [];

export const mockAuthService = {
  // Sign in with email and password
  async signIn(email: string, password: string): Promise<MockUser> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple mock validation
        if (email === 'admin@sports.com' && password === 'password123') {
          const user: MockUser = {
            uid: 'mock-user-id',
            email: email
          };
          currentUser = user;
          // Notify all listeners
          authStateListeners.forEach(listener => listener(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  // Sign out
  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        // Notify all listeners
        authStateListeners.forEach(listener => listener(null));
        resolve();
      }, 300);
    });
  },

  // Get current user
  getCurrentUser(): MockUser | null {
    return currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged(callback: (user: MockUser | null) => void): () => void {
    authStateListeners.push(callback);
    // Immediately call with current state
    callback(currentUser);
    
    // Return unsubscribe function
    return () => {
      authStateListeners = authStateListeners.filter(listener => listener !== callback);
    };
  }
};