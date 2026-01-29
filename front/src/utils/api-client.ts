import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Axios instance for frontend API requests.
 * - baseURL: backend API URL (NEXT_PUBLIC_API_URL)
 * - withCredentials: sends cookies for authentication (better-auth session)
 */
export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
