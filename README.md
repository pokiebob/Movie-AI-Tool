# Movie AI Tool

## To Start

- enter `movie-ai-tool` directory
- set environment variables (`.env`)
- run `npm install`
- run `npm run dev`

## ARCHITECTURE

Movie AI Tool UI (Next.js / React) -> API Routes (Next.js + Prisma) -> Supabase Postgres
            |
            |-------> Authentication via NextAuth (Google OAuth)
            |
            |-------> Fun Fact Generation (OpenAI API)

## AWS / Hosting

- Supabase for Postgres + authentication adapter
- Deployed via Vercel (Next.js)

## Sources

- Prisma, NextJS, Supabase, Vercel documentation
- https://www.youtube.com/watch?v=AbUVY16P4Ys
- https://www.youtube.com/watch?v=RBI6ShIaabM
- https://www.youtube.com/watch?v=2xwv4T552lM
- https://www.youtube.com/watch?v=bi3WTSO1ing
