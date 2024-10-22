import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPAge";
import SearchPage from "./pages/home/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { user, isAuthChecking, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isAuthChecking) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <NotFoundPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/*"
          element={user ? <NotFoundPage /> : <Navigate to="/login" />}
        />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default App;
