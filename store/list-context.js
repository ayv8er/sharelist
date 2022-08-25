import { createContext, useContext } from "react";

export const ListContext = createContext({});

export function useListContext() {
  return useContext(ListContext);
}
