import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: async ({ password }) => {
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const { token } = await response.json();
      localStorage.setItem('token', token);
      return Promise.resolve();
    } catch {
      throw new Error('كلمة المرور غير صحيحة');
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  
  getIdentity: () =>
    Promise.resolve({
      id: 'admin',
      fullName: 'المدير',
    }),
  
  getPermissions: () => Promise.resolve(''),
}; 