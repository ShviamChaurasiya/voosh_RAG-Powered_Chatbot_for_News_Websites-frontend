// src/config.js

/**
 * Configuration file for the frontend application.
 * Defines environment-specific variables like API base URL.
 */

// Base URL for the backend API.
// It tries to use the VITE_API_BASE_URL environment variable if available,
// otherwise, it defaults to "/api".
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// Example of how to set the environment variable in a .env file:
// VITE_API_BASE_URL=http://localhost:3000/api
// the location of the .env file is at the root of the project.