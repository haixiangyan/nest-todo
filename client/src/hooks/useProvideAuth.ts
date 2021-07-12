import {useState} from "react"

const fakeAuth = {
  isAuthenticated: false,
  login(cb: Function) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  logout(cb: Function) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const useProvideAuth = () => {
  const [user, setUser] = useState<string | null>(null);

  const login = (cb: Function) => {
    return fakeAuth.login(() => {
      setUser("user");
      cb();
    });
  };

  const logout = (cb: Function) => {
    return fakeAuth.logout(() => {
      setUser(null);
      cb();
    });
  };

  return { user, login, logout };
}

export default useProvideAuth;
