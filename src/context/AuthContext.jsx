import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("CurrentUser")
      ? { email: localStorage.getItem("CurrentUser") }
      : null,
  );

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exist" };
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("CurrentUser", email);
    setUser({ email });
    return { success: true };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, error: "Incorrect Email or password" };
    }

    localStorage.setItem("CurrentUser", email);
    setUser({ email });
    return { success: true };
  }

  function logOut() {
    localStorage.removeItem("CurrentUser");
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ signUp, user, logOut, login }}>
      {children}
    </AuthContext.Provider>
  );
}
