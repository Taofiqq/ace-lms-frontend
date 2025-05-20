// // src/context/AuthContext.tsx

// "use client"; // Mark as client component

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/axios";

// // Define types for user and context
// interface User {
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   register: (email: string, password: string, role: string) => Promise<any>;
//   login: (email: string, password: string) => Promise<User>;
//   logout: () => void;
// }

// // Create the context with a default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is logged in on initial load
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (e) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//       }
//     }

//     setLoading(false);
//   }, []);

//   const register = async (email: string, password: string, role: string) => {
//     try {
//       setLoading(true);
//       const response = await api.post("/users/register", {
//         email,
//         password,
//         role,
//       });

//       return response.data;
//     } catch (error: any) {
//       throw error?.response?.data || error.message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email: string, password: string): Promise<User> => {
//     try {
//       setLoading(true);
//       const response = await api.post("/auth/login", {
//         email,
//         password,
//       });

//       const { access_token, user } = response.data;

//       // Store token and user data
//       localStorage.setItem("token", access_token);
//       localStorage.setItem("user", JSON.stringify(user));

//       setUser(user);
//       return user;
//     } catch (error: any) {
//       throw error?.response?.data || error.message;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     router.push("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
