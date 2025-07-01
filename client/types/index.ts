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

export type RoleType = {
  title: string;
  description: string;
};

export type ProjectType = {
  id?: string; // Optional for creation
  title: string;
  description: string;
  category: string;
  teamSize: number;
  stage: string;
  stageColor: string;
  founder: string;
  datePosted: string; // ISO date string (e.g. '2024-06-29')
  website?: string;
  status: string;
  image: string;
  roles: RoleType[];
};
