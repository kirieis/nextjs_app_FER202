"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

type FavoritesAction =
  | { type: "SET"; payload: number[] }
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number };

function favoritesReducer(state: number[], action: FavoritesAction): number[] {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      if (state.includes(action.payload)) return state;
      return [...state, action.payload];
    case "REMOVE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

interface FavoritesContextType {
  favorites: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  // When user changes (login/logout):
  useEffect(() => {
    let isMounted = true;

    async function loadFavorites() {
      if (!user) {
        dispatch({ type: "SET", payload: [] });
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("product_id");

      if (!error && data && isMounted) {
        const ids = data.map((row: { product_id: number }) => row.product_id);
        dispatch({ type: "SET", payload: ids });
      }
    }

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  const toggleFavorite = async (productId: number) => {
    if (!user) return;

    const alreadyFavorited = favorites.includes(productId);

    if (alreadyFavorited) {
      // Optimistic remove
      dispatch({ type: "REMOVE", payload: productId });
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("product_id", productId);

      if (error) {
        // Rollback
        dispatch({ type: "ADD", payload: productId });
      }
    } else {
      // Optimistic add
      dispatch({ type: "ADD", payload: productId });
      const { error } = await supabase
        .from("favorites")
        .insert({ product_id: productId });

      if (error) {
        // Rollback
        dispatch({ type: "REMOVE", payload: productId });
      }
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
