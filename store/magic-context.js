import { createContext, useContext, useEffect, useState } from "react";
import { Magic } from "magic-sdk";

const MagicContext = createContext(null);

export function useMagicContext() {
  const context = useContext(MagicContext);

  if (context === undefined) {
    throw new Error("useMagicContext was used outside of its Provider");
  }
  return context;
}

export function MagicContextProvider({ children }) {
  const [magic, setMagic] = useState(null);

  useEffect(() => {
    async function initMagic() {
      if (!magic && typeof window != "undefined") {
        const makeMagic = await new Magic(
          process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
        );
        makeMagic.preload;
        setMagic(makeMagic);
      }
    }
    initMagic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MagicContext.Provider value={magic}>{children}</MagicContext.Provider>
  );
}
