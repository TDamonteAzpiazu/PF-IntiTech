'use client'
import { IAuthContext, IAuthProviderProps, Icontext_props, Icontext_provider, Isession_active } from "@/interfaces/interfaces"
import { createContext, useContext, useState, useEffect} from "react"


const Context = createContext<Icontext_props>(
    {
        user_data: null,
        setUser_data: () => { }
    }
)


export const Context_Provider: React.FC<Icontext_provider> = ({ children }) => {
    const [user_data, setUser_data] = useState<Isession_active | null>(null)

    useEffect(() => {
        if (user_data) {
            localStorage.setItem('user_active', JSON.stringify({ token: user_data }))
        }
    }, [user_data])

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const user = localStorage.getItem('user_active')
            setUser_data(JSON.parse(user!))
        }
    }, [])

    return (
        <Context.Provider value={{ user_data, setUser_data }}>
            {children}
        </Context.Provider>
    )
}

export const useAuth_context = () => useContext(Context)


//////////////////////////////////////////////////////////////////////////////////////*



const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<Isession_active | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageToken: string | null = localStorage.getItem("token");
      if (storageToken) {
        setToken(storageToken);
      }
    }
  }, []);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

////////////////////////////////////////////////////////////////////////////////////////////*