
export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // Optional in returned user objects
}
