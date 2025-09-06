import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export default async function Home() {
  // If the user is logged in, redirect to the dashboard

  const users = await prisma.user.findMany();

  return (
    <main style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
      <div>
        {/* display all users for now */}
        {users.map((user) => (
          <div key={user.id}>
            {user.email} {user.name} {user.favMovie}
          </div>
        ))}
        <h1>Enter your favorite movie</h1>
        {/* Add login button */}
      </div>
    </main>
  );
}
