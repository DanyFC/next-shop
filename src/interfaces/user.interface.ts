export interface User {
  id: string;
  email: string;
  emailVerified?: string;
  image?: string;
  name: string;
  role: string;
}