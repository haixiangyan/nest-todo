export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  is_admin: 0 | 1;
}
