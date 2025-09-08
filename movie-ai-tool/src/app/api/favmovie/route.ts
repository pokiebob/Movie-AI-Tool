import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const formData = await request.formData();
  const favMovie = formData.get("favMovie");
  if (typeof favMovie !== "string" || favMovie.trim().length === 0) {
    return NextResponse.json(
      { error: "Invalid movie title." },
      { status: 400 }
    );
  }

  try {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { favMovie: favMovie.trim() },
    });

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update favorite movie." },
      { status: 500 }
    );
  }
}
