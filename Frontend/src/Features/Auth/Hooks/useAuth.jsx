import React from "react";

import { setUser, setError, setLoading } from "../Slices/auth.slice";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../Service/auth.service";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await registerUser(userData);
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setError(null));
      } else {
        dispatch(setError(data.error));
      }
      return data;
    } catch (err) {
      dispatch(
        setError(
          err?.message || "Something went wrong during registering user",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogin = async (userData) => {
    try {
      dispatch(setLoading(true));
      const data = await loginUser(userData);
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setError(null));
      } else {
        dispatch(setError(data.error));
      }
      return data;
    } catch (err) {
      dispatch(
        setError(err?.message || "Something went wrong during loggin in user"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleGetProfile = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getUserProfile();
      if (data.success) {
        dispatch(setUser(data.user));
        dispatch(setError(null));
      } else {
        dispatch(setError(data.error));
      }
      return data;
    } catch (err) {
      dispatch(
        setError(
          err?.message || "Something went wrong during fetching user profile",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      const data = await logoutUser();
      if (data.success) {
        dispatch(setUser(null));
        dispatch(setError(null));
      } else {
        dispatch(setError(data.error));
      }
      return data;
    } catch (err) {
      dispatch(
        setError(err?.message || "Something went wrong during loggin out user"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
  return { handleGetProfile, handleLogin, handleRegister, handleLogout };
};
