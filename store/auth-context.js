import { createContext, useContext, useEffect, useState } from "react";
import { useMagicContext } from "./magic-context";

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [userMetadata, setUserMetadata] = useState(null);
  const magic = useMagicContext();

  useEffect(() => {
    async function fetchUser() {
      if (magic) {
        try {
          const isUserLoggedIn = await magic.user.isLoggedIn();
          if (isUserLoggedIn) {
            magic.user.getMetadata().then((userData) => {
              setUserMetadata(userData);
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchUser();
  }, [magic]);

  return (
    <AuthContext.Provider
      value={{
        userMetadata,
        setUserMetadata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
