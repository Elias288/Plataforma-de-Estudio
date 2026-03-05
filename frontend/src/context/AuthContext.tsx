import { createContext, useContext, useEffect, useState } from 'react';

export type Role = 'ADMIN' | 'PROFESOR' | 'ALUMNO';
type Gender = 'MALE' | 'FEMALE';

export interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  professorId: string;
  professor: { id: string; email: string };
  students: string[];
  tasks: Task[];
}

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  age?: number;
  gender?: Gender;
  createdAt?: Date;
  courses?: Course[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  courseId: string;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  repoUrl: string;
  description: string;
  grade?: number;
  createdAt: Date;
  feedback?: string;
  taskId: string;
  studentId: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
