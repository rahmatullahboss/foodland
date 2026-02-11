# Foodland - DC Store

[Live Site](https://foodland.digitalcare.site)

Foodland is a modern, high-performance E-commerce platform built with Next.js and optimized for Cloudflare's global network using OpenNext. It features a rich product catalog, secure authentication, and seamless stripe integration.

## 🚀 Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQLite)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Payments**: [Stripe](https://stripe.com/)
- **Images**: [Cloudinary](https://cloudinary.com/)
- **Email**: [Resend](https://resend.com/)

## 📂 Project Structure

```bash
├── drizzle/             # D1 migrations, schemas and seed files
├── src/
│   ├── app/             # Next.js App Router (pages and API)
│   ├── components/      # React components (UI, Layouts)
│   ├── drizzle/         # Database schema and client
│   ├── lib/             # Utility functions and shared logic
│   ├── schemas/         # Zod validation schemas
├── wrangler.toml        # Cloudflare configuration
├── next.config.ts       # Next.js configuration
└── package.json         # Scripts and dependencies
```

## 🛠️ Getting Started

### 1. Prerequisites

- Node.js (Latest LTS)
- Cloudflare Account
- Wrangler CLI installed (`npm install -g wrangler`)

### 2. Installation

```bash
npm install
```

### 3. Local Development

```bash
npm run dev
```

### 4. Database Setup (Local)

Generate and apply migrations to your local D1 database:

```bash
npm run db:generate
npm run db:migrate:local
npm run db:seed:local
```

## 🌐 Deployment

Deployment is handled via OpenNext for Cloudflare:

1. **Build for Cloudflare**:

   ```bash
   npm run build:cf
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

_Note: Ensure you have run `wrangler login` before deploying._

## 🔑 Environment Variables

### Public Variables (in `wrangler.toml` or `.env`)

- `NEXT_PUBLIC_APP_URL`: The production URL of the app.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key.
- `GOOGLE_CLIENT_ID`: Google OAuth Client ID.

### Secrets (set via `npx wrangler secret put`)

- `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `GROQ_API_KEY`
- `RESEND_API_KEY`

## 📜 Commands Reference

| Command                    | Description                                |
| :------------------------- | :----------------------------------------- |
| `npm run dev`              | Starts local development server            |
| `npm run build:cf`         | Builds the project for Cloudflare          |
| `npm run deploy`           | Builds and deploys to Cloudflare           |
| `npm run db:migrate:local` | Applies migrations to local D1             |
| `npm run db:seed:local`    | Seeds the local D1 database                |
| `npm run preview`          | Previews the worker locally using Wrangler |

---

Built with ❤️ by [Digital Care](https://digitalcare.site)
