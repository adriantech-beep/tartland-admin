import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token", err);
    localStorage.removeItem("adminToken");
    return null;
  }
};
