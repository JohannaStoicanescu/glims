export interface NewUser {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  profileImage?: File | null;
}
