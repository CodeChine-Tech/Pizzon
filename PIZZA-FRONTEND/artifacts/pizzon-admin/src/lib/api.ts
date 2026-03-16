const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const api = {
  get: async (endpoint, token = null) => {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE}${endpoint}`, { headers });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },
  post: async (endpoint, data, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },
  patch: async (endpoint, data, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('API Error');
    return response.json();
  },
};