type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

let API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest(method: Method, url: string, data?: any) {
  const headers = {
    'Content-Type': 'application/json',
  } as Record<string, any>;

  if (typeof window === 'undefined') {
    API_BASE_URL = process.env.API_BASE_URL;

    const { cookies } = await import('next/headers');
    const token = cookies().get('access_token')?.value;
    headers['Authorization'] = token ?? `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    return fetch(`${API_BASE_URL}${url}`, {
      method,
      credentials: 'include',
      headers,
      body: method !== 'GET' ? JSON.stringify(data || {}) : undefined,
    })
      .then((response) => {
        if (!response.ok) reject();
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
