import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import Image from "next/image";
import styles from "./home.module.css";
import { signOut } from "next-auth/react";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true, image: true, favMovie: true },
  });

  let funFact: string | null = null;
  if (user?.favMovie) {
    const title = user.favMovie;
    const prompt = `Provide an interesting fun fact about the movie "${title}". Please don't just summarize the movie or tell me something that I would know just by watching it.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    funFact = data.choices?.[0]?.message?.content?.trim() ?? null;
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          {user?.image && (
            <Image
              src={user.image}
              alt="avatar"
              width={64}
              height={64}
              className={styles.avatar}
            />
          )}
          <div>
            <h1 className={styles.name}>{user?.name}</h1>
            <p className={styles.email}>{user?.email}</p>
          </div>
        </div>

        {!user?.favMovie ? (
          <form method="POST" action="/api/favmovie">
            <label>Please enter your favorite movie below.</label>
            <div className={styles.movieInputRow}>
              <input
                type="text"
                name="favMovie"
                placeholder="Enter a movie title..."
                required
                className={styles.movieInput}
              />

              <button type="submit" className={styles.movieButton}>
                Submit
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className={styles.movie}>
              Favorite movie: {user?.favMovie ?? "Not set yet"}
            </p>
            <div className={styles.factBox}>
              <strong>Fun fact:</strong> {funFact || "Loading..."}
            </div>
          </>
        )}

        <LogoutButton />
      </div>
    </main>
  );
}
