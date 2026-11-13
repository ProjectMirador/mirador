import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

/**
 * Hook that fetches and manages debounced IIIF Content Search autocomplete suggestions.
 * @param {object} [autocompleteService]
 * @param {string} [autocompleteService.id]
 * @returns {{ suggestions: Array, fetchSuggestions: Function, clearSuggestions: Function }}
 */
export function useSearchAutocomplete(autocompleteService) {
  const [suggestions, setSuggestions] = useState([]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  const fetchSuggestions = useDebouncedCallback(
    useCallback(
      (term) => {
        if (!autocompleteService?.id || !term) return;

        fetch(`${autocompleteService.id}?${new URLSearchParams({ q: term })}`)
          .then((response) => response.json())
          .then((json) => {
            setSuggestions(json.terms || []);
          });
      },
      [autocompleteService],
    ),
    500,
  );

  return {
    clearSuggestions,
    fetchSuggestions,
    suggestions,
  };
}
