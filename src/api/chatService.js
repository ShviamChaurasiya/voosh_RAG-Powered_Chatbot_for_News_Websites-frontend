import axios from 'axios';
import { API_BASE_URL } from '../config';

/**
 * Axios instance configured with the base URL for the API.
 * This centralizes API requests and makes it easier to manage base URLs.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Fetches a new session ID from the backend.
 * @returns {Promise<string>} A promise that resolves to the new session ID.
 */
export const getNewSessionId = async () => {
  const response = await api.get('/session/new');
  return response.data.sessionId;
};

/**
 * Sends a user message to the chatbot and receives its response.
 * @param {string} sessionId - The current chat session ID.
 * @param {string} message - The user's message.
 * @returns {Promise<object>} A promise that resolves to the bot's response data.
 */
export const postMessage = async (sessionId, message) => {
  const response = await api.post('/chat', { sessionId, message });
  return response.data;
};

/**
 * Retrieves the chat history for a given session ID.
 * @param {string} sessionId - The session ID to fetch history for.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of message objects.
 */
export const getSessionHistory = async (sessionId) => {
  const response = await api.get(`/history/${sessionId}`);
  return response.data;
};

/**
 * Clears the chat history for a specific session.
 * @param {string} sessionId - The session ID whose history needs to be cleared.
 * @returns {Promise<object>} A promise that resolves to the response data from the clear operation.
 */
export const clearSessionHistory = async (sessionId) => {
  const response = await api.post('/session/clear', { sessionId });
  return response.data;
};