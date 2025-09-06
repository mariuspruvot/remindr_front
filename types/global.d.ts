/**
 * Global type definitions for Node.js environment variables
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL?: string;
      NEXT_PUBLIC_API_TOKEN?: string;
    }
  }
}

export {};
