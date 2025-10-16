const SERVER_BASE_URL = 'http://back:3000';
const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch utility for server-side (Next.js server components)
 * Automatically targets the internal backend service.
 */
export async function fetchApiFromServer(
  route: string,
  options?: RequestInit
): Promise<Response> {
  const url = `${SERVER_BASE_URL}${route.startsWith('/') ? route : `/${route}`}`;
  return fetch(url, options);
}

/**
 * Fetch utility for client-side (Next.js client components)
 * Automatically targets the public API URL.
 */
export async function fetchApiFromClient(
  route: string,
  options?: RequestInit
): Promise<Response> {
  const url = `${CLIENT_BASE_URL}${route.startsWith('/') ? route : `/${route}`}`;
  return fetch(url, options);
}

