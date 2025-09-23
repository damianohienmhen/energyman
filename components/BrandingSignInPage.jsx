"use client"; // Ensure this runs on the client side

import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage({ onSuccess }) {
  const theme = useTheme();

  const signIn = async (provider, formData) => {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      console.log("✅ Login successful:", data);

      // Save user for persistence
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update app state
      if (onSuccess) {
        onSuccess(data.user);
      }

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: true },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
