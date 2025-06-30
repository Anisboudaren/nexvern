export interface UserType {
  id: string;
  email: string;
  name: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  loading: boolean;
  me: UserType | null;
  setMe: (user: UserType | null) => void;
}
