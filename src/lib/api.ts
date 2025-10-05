/**
 * Axios configuration for API calls
 * Base URL should point to your Django backend
 */

import axios from "axios";

// Type for the token getter function
type TokenGetter = () => Promise<string | null>;

// Token getter function that will be injected by the app
let tokenGetter: TokenGetter | null = null;

/**
 * Set the token getter function
 * This should be called once during app initialization with Clerk's getToken
 *
 * @param getter - Async function that returns the auth token
 */
export const setAuthTokenGetter = (getter: TokenGetter): void => {
  tokenGetter = getter;
};

// Create axios instance with default config
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Inject auth token from Clerk
api.interceptors.request.use(
  async (config) => {
    try {
      // Get token from the injected getter function
      if (tokenGetter) {
        const token = await tokenGetter();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
      // Continue with request even if token fetch fails
      // This allows unauthenticated endpoints to still work
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      console.error("Unauthorized - redirect to login");
    }
    return Promise.reject(error);
  }
);
