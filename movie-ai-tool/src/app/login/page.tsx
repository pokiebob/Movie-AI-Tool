"use client";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";

export default function LoginPage() {
  return (
    <main style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Movie Fun Facts
        </h1>
        <GoogleButton onClick={() => signIn("google", { callbackUrl: "/" })}>
          Continue with Google
        </GoogleButton>
      </div>
    </main>
  );
}
