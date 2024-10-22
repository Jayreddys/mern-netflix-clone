import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isAuthChecking: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("SignIn Successful");
    } catch (error) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "Error Signing Up");
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("LogIn Successful");
    } catch (error) {
      set({ user: null, isLoggingIn: false });
      toast.error(error.response.data.message || "Error Logging In");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged Out Successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Error Logging out");
    }
  },
  authCheck: async () => {
    set({ isAuthChecking: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isAuthChecking: false });
    } catch (error) {
      set({ user: null, isAuthChecking: false });
    }
  },
}));
