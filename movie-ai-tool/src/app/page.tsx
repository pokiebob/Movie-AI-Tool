import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import Image from "next/image";
import styles from "./home.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true, image: true, favMovie: true },
  });

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

        <p className={styles.movie}>
          Favorite movie: {user?.favMovie ?? "Not set yet"}
        </p>
        <div className={styles.factBox}>
          <strong>Fun fact:</strong> (to be filled from API)
        </div>
      </div>
    </main>
  );
}
