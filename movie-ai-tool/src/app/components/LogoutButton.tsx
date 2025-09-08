"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#e53e3e",
        color: "white",
        border: "none",
        borderRadius: "0.25rem",
        cursor: "pointer",
        marginTop: "1rem",
      }}
    >
      Logout
    </button>
  );
}
