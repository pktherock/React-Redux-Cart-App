import { createAsyncThunk } from "@reduxjs/toolkit";
import { alertService, authService } from "../../services";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await authService.getCurrentUser();
  return response;
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ userName, email, password }) => {
    const response = await authService.createAccount(userName, email, password);
    alertService.success("User created and logged in successfully");
    return response;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await authService.login(email, password);
    alertService.success("Logged In successfully");
    return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  alertService.success("logged out successfully");
  return null;
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email }) => {
    await authService.sendResetPasswordLink(email);
    return null;
  }
);

export const updateEmail = createAsyncThunk(
  "auth/updateEmail",
  async ({ password, newEmail }) => {
    const response = await authService.updateUserEmail(password, newEmail);
    alertService.success(
      "Email has been sended to new email id please verify first and reload this page"
    );
    return response;
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ password, newPassword }) => {
    const response = await authService.updateUserPassword(
      password,
      newPassword
    );
    alertService.success("Password has been update successfully");
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ currentPassword }) => {
    await authService.deleteUserFromDB(currentPassword);
    alertService.success("User has been deleted successfully");
    return null;
  }
);
