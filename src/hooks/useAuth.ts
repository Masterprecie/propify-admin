import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const userData = localStorage.getItem("@propify_admin_user");

  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      const user = parsedUser.user || null;
      const isAuthenticated = parsedUser.isAuthenticated || false;
      const userRole = parsedUser.user?.role || null;

      return { user, isAuthenticated, userRole };
    } catch (error) {
      console.error("Failed to parse user data from local storage:", error);
      return {
        user: null,
        isAuthenticated: false,
        userRole: null,
      };
    }
  }

  return { user: null, isAuthenticated: false, userRole: null };
};

export const useSaveLastRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem("@me2mentor_last_route", pathname);
  }, [pathname]);
};

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the route changes
  }, [pathname]);
};
