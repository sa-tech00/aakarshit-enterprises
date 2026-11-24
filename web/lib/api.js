// Client-side helper used by the enquiry form and the admin dashboard.
const TOKEN_KEY = 'aakarshit_admin_token';

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
export const setToken = (t) => {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {}
};
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
};

export async function api(path, { method = 'GET', body, form, auth = false } = {}) {
  const headers = {};
  let payload;
  if (form) {
    payload = form; // browser sets the multipart boundary
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: payload });
  } catch {
    throw new Error('Cannot reach the server. Please check your connection.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (res.status === 401 && auth) {
    clearToken();
    if (typeof window !== 'undefined' && !location.pathname.startsWith('/admin/login')) {
      location.href = '/admin/login';
    }
  }
  if (!res.ok) {
    const err = new Error(data?.error || 'Something went wrong.');
    err.fields = data?.fields;
    throw err;
  }
  return data;
}

// Server-side fetch for public pages (gallery, feedback). Never throws.
export async function serverGet(path) {
  const base = process.env.API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${base}/api${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
