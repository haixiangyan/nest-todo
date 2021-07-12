import {useState} from "react"
import http from "../http"

const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => {
    // 缓存
    const cacheToken=  localStorage.getItem('token') || null;
    const cacheTokenExpires = Number(localStorage.getItem('token_expires') || 0);

    // 是否过期
    const isExpired = Date.now() - cacheTokenExpires >= 0

    return !isExpired ? cacheToken : null;
  });

  const login = async (data: any) => {
    try {
      const response = await http.post('/auth/login', data);

      const {token, expiresIn} = response.data;

      const tokenExpires = Date.now() + expiresIn * 60 * 1000

      // 本地存储
      localStorage.setItem('token', token);
      localStorage.setItem('token_expires', String(tokenExpires));

      setToken(response.data.access);

      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
  };

  return { setToken, token, login, logout };
}

export default useAuth;
