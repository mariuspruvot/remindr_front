/**
 * React Query configuration
 * Provides caching, refetching, and state management for API calls
 */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Refetch on window focus (good UX)
      refetchOnWindowFocus: true,
      // Retry failed requests 1 time
      retry: 1,
      // Cache data for 5 minutes
      staleTime: 5 * 60 * 1000,
    },
  },
});
