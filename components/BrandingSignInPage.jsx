"use client"; // Ensure this runs on the client side

import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

const providers = [{ id: "credentials", name: "Email and Password" }];

export default function CredentialsSignInPage() {
  const theme = useTheme();

  const signIn = async (provider, formData) => {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
  
    try {
<<<<<<< HEAD
      const response = await fetch("http://localhost:4000/login", {
=======
      const response = await fetch("https://78c119f174f9.ngrok.app/login", {
>>>>>>> 48b8fcda2904ad868caf534fbfc3172ff4e4d384
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
  
      // Save user object in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
  
      // ✅ Redirect to dashboard page
      window.location.href = "/dashboard"; // if dashboard is app/page.tsx
      // OR
      // window.location.href = "/dashboard"; // if dashboard is app/dashboard/page.tsx
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
