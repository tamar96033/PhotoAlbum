
export const AuthService = {
    saveToken: (token: string) => {
      localStorage.setItem("access_token", token);
    },
  
    getToken: (): string | null => {
      return localStorage.getItem("access_token");
    },
  
    removeToken: () => {
      localStorage.removeItem("access_token");
    },
  
    isTokenExpired: (): boolean => {
      const token = AuthService.getToken();
      if (!token) return true;
  
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // Convert to ms
        return Date.now() > exp;
      } catch {
        return true;
      }
    }
  };