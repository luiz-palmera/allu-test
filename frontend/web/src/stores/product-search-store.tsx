"use client";

import { create } from "zustand";
import {
  autocompleteProducts,
  searchProducts,
  type AutocompleteSuggestion,
} from "@/services/product";
import type { Product } from "@/types/product";

let autocompleteRequestId = 0;

type ProductSearchStore = {
  query: string;
  suggestions: AutocompleteSuggestion[];
  results: Product[] | null;
  isSearching: boolean;
  isLoadingSuggestions: boolean;
  fuzzy: boolean;

  setQuery: (query: string) => void;
  loadSuggestions: (query: string) => Promise<void>;
  submitSearch: (query?: string) => Promise<void>;
  clearSearch: () => void;
};

export const useProductSearchStore = create<ProductSearchStore>((set, get) => ({
  query: "",
  suggestions: [],
  results: null,
  isSearching: false,
  isLoadingSuggestions: false,
  fuzzy: false,

  setQuery: (query) => {
    set({ query });
  },

  loadSuggestions: async (query) => {
    const trimmed = query.trim();
    const currentRequestId = ++autocompleteRequestId;

    if (!trimmed) {
      set({ suggestions: [] });
      return;
    }

    set({ isLoadingSuggestions: true });

    try {
      const response = await autocompleteProducts(trimmed);

      const latestQuery = get().query.trim();

      if (
        currentRequestId === autocompleteRequestId &&
        latestQuery === trimmed
      ) {
        set({ suggestions: response.suggestions });
      }
    } catch {
      const latestQuery = get().query.trim();

      if (
        currentRequestId === autocompleteRequestId &&
        latestQuery === trimmed
      ) {
        set({ suggestions: [] });
      }
    } finally {
      const latestQuery = get().query.trim();

      if (
        currentRequestId === autocompleteRequestId &&
        latestQuery === trimmed
      ) {
        set({ isLoadingSuggestions: false });
      }
    }
  },

  submitSearch: async (query) => {
    const currentQuery = (query ?? get().query).trim();

    if (!currentQuery) {
      set({
        query: "",
        suggestions: [],
        results: null,
        fuzzy: false,
        isSearching: false,
      });
      return;
    }

    set({
      isSearching: true,
      query: currentQuery,
    });

    try {
      const response = await searchProducts(currentQuery, 1, 50);

      set({
        results: response.data,
        suggestions: [],
        fuzzy: !!response.meta.fuzzy,
      });
    } catch {
      set({
        results: [],
        suggestions: [],
        fuzzy: false,
      });
    } finally {
      set({ isSearching: false });
    }
  },

  clearSearch: () => {
    set({
      query: "",
      suggestions: [],
      results: null,
      isSearching: false,
      isLoadingSuggestions: false,
      fuzzy: false,
    });
  },
}));
