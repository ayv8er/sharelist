import { createContext, useContext, useEffect, useState } from "react";
import { useMagicContext } from "./magic-context";

const UserContext = createContext(null);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }) {
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
      } else {
        setUserMetadata(null);
      }
    }
    fetchUser();
  }, [magic]);

  const values = {
    userMetadata,
    setUserMetadata,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
