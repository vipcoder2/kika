// Storage interface for future database integration
// Currently using Firebase Firestore for data storage

export interface IStorage {
  // Match-related methods would go here if we switch from Firebase
  // Currently all data operations are handled by Firebase services
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder for future database implementation
  }
}

export const storage = new MemStorage();
