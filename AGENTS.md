# Senior Engineering Guidelines for Profesia

This document defines the strict engineering, architectural, and security standards for the **Profesia** project. All developers and AI agents working on this codebase must adhere strictly to these guidelines.

---

## 1. System Architecture & File Structure Standards

### 1.1 App Router Layout & Directory Conventions
- **Dynamic Locale Routing**: All application pages must reside inside `app/[locale]/` to ensure seamless `next-intl` internationalization.
- **Route Groups**: Use route groups (e.g., `app/[locale]/(auth)/`) to organize logical sections without polluting URL paths.
- **Colocation Principle**: Place page-specific sub-components in a `components/` directory relative to the feature domain (e.g., `components/profession/`, `components/mbti/`, `components/zodiac/`). Shared atomic primitives belong in `components/ui/`.
- **Data Access Isolation**: Database queries, Supabase calls, and external API requests must never be written directly inside UI components. They must be abstracted into `services/` (e.g., `services/professionService.ts`, `services/mbtiService.ts`).

### 1.2 Server vs. Client Component Boundaries
- **Default to Server Components**: All components in Next.js App Router are Server Components by default. Keep them as Server Components to minimize client-side JavaScript bundle size and leverage direct server data fetching.
- **Push State Down ("Leaf Components")**: Only mark components with `'use client'` when interactive state (`useState`, `useEffect`, `useReducer`), browser APIs (`localStorage`, event listeners), or client hooks (`useTranslations`, `usePathname`, `useRouter`) are required.
- **Do NOT mark Page or Layout as `'use client'`**: Pass server-fetched data down to client sub-components as props or wrap interactive widgets in dedicated leaf client components.

---

## 2. Next.js 15+ & React 19 Standards

### 2.1 Next.js 15 Dynamic Routes (`params` & `searchParams`)
In Next.js 15+, `params` and `searchParams` passed to Page components, Layouts, and Route Handlers are **Promises** and **MUST be awaited** before accessing their properties.

```tsx
// Correct (Next.js 15+)
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ mbti?: string }>;
}) {
  const { locale, slug } = await params;
  const { mbti } = await searchParams;

  return <div>{slug} - {mbti}</div>;
}

// Incorrect (Will break in Next.js 15+)
export default async function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;
}
```

### 2.2 Server Actions & Data Mutations
- Always validate incoming payload arguments using Zod schemas before executing mutations.
- Return structured result objects instead of throwing uncaught runtime exceptions:
  ```ts
  type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };
  ```
- Revalidate affected tags or paths explicitly using `revalidateTag()` or `revalidatePath()`.

### 2.3 Caching & Revalidation Strategy
- Next.js 15 defaults `fetch` requests to `uncached` (`cache: 'no-store'`). When caching static or semi-static data (such as MBTI question sets or zodiac information), explicitly define revalidation intervals or tags.

---

## 3. Security & Data Protection Standards

### 3.1 Supabase Row-Level Security (RLS)
- **Mandatory RLS**: All Supabase PostgreSQL tables MUST have Row-Level Security (RLS) enabled. Never disable RLS in production tables.
- **Policy Enforcement**: Write explicit policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`. User data (such as test history, bookmarks, and profiles) must only be readable and writable by the authenticated owner (`auth.uid() = user_id`).
- **Public Read Access**: Static catalog data (professions, MBTI types, zodiac info) should have public read policies (`FOR SELECT USING (true)`), but restricted write/admin policies.

### 3.2 Environment Variable Security & Secret Segregation
- **Public Keys**: Only keys prefixed with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) may be exposed to the browser.
- **Service Role & Private Keys**: `SUPABASE_SERVICE_ROLE_KEY` or admin tokens MUST NEVER be prefixed with `NEXT_PUBLIC_` and MUST NEVER be imported into Client Components (`'use client'`). Service role client initialization must remain strictly server-side.

### 3.3 Input Sanitization & Threat Prevention
- **Prevent XSS**: Escape dynamic user inputs before rendering. Never use `dangerouslySetInnerHTML` unless rendering sanitized HTML (e.g., via DOMPurify).
- **Prevent Injection Attacks**: Use parameterized queries provided by Supabase JS client (`.eq()`, `.in()`, etc.). Avoid raw SQL string concatenation.
- **Prevent Mass Assignment**: Explicitly pick allowed fields from request payloads when updating database rows; do not pass raw user payload objects directly into `.update()` or `.insert()`.

---

## 4. Supabase & Data Access Layer Architecture

### 4.1 Server vs. Client Supabase Instances
Use `@supabase/ssr` to maintain correct cookie handling across server and client boundaries:

- **Server Components & Server Actions**:
  ```ts
  import { createServerClient } from '@supabase/ssr';
  import { cookies } from 'next/headers';

  export async function createClient() {
    const cookieStore = await cookies();
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Handled in Server Components
            }
          },
        },
      }
    );
  }
  ```
- **Client Components**:
  ```ts
  import { createBrowserClient } from '@supabase/ssr';

  export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  ```

### 4.2 Error Resiliency & Fallback Data
- Database calls inside `services/` must wrap Supabase calls in `try/catch` or check for `error` in response.
- Provide graceful degradation or fallback static JSON data (located in `data/`) when Supabase connection fails or is unconfigured during local development.

---

## 5. Internationalization (i18n) & Accessibility (a11y)

### 5.1 `next-intl` Best Practices
- **Client Components**: Use `useTranslations('Namespace')` hook.
- **Server Components**: Use `await getTranslations({ locale, namespace: 'Namespace' })`.
- **Zero Hardcoded Strings Policy**: All user-facing UI labels, placeholders, titles, aria-labels, and error messages MUST be stored in translation dictionaries (`messages/id.json` and `messages/en.json`).

### 5.2 Accessibility (a11y) & Semantic HTML
- **Semantic Structure**: Use proper HTML5 tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`). Ensure only **one `<h1>` per page**.
- **Interactive Elements**: Every button or clickable element must have an accessible name (`aria-label` for icon buttons).
- **Keyboard Navigation**: Ensure custom UI primitives (modals, dropdowns, tab controls) support standard keyboard interaction (`Tab`, `Escape`, `Enter`, `Space`).

---

## 6. Styling, UI/UX & Tailwind CSS v4

### 6.1 Theme & Design Tokens
- Utilize Tailwind CSS v4 configuration and custom CSS properties defined in `app/[locale]/globals.css`.
- Ensure dark mode support across all UI elements using the `dark:` utility modifier.
- Adhere to the established 4 MBTI Role Group color palette:
  - 💜 **Analysts**: Purple (`bg-purple-*`, `text-purple-*`)
  - 💚 **Diplomats**: Emerald (`bg-emerald-*`, `text-emerald-*`)
  - 💙 **Sentinels**: Sky/Blue (`bg-sky-*`, `text-sky-*`)
  - 💛 **Explorers**: Amber/Yellow (`bg-amber-*`, `text-amber-*`)

### 6.2 Responsive & Dynamic Design
- Design mobile-first using Tailwind's breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- Include hover states, focus rings (`focus-visible:ring-2`), and micro-interactions for interactive controls.
- Use Skeleton components for loading states and `Sonner` toasts for asynchronous action notifications.

---

## 7. TypeScript & Code Quality Standards

### 7.1 Strict Typing Guidelines
- Enable strict mode (`strict: true` in `tsconfig.json`).
- Explicitly define interfaces/types for all domain models, component props, and service function returns.
- **No `any` Policy**: Avoid `any`. Use `unknown` with type guards or custom generic types when exact structure is undetermined.

### 7.2 Code Cleanliness, Documentation & State Management
- **No Emojis in Code Comments Policy**: All source code comments (`//` or `/* ... */`) MUST be written in plain text, professional, and concise. Emojis or decorative icons are strictly forbidden in source code comments and docstrings.
- Keep functions small, pure, and focused on a single responsibility.
- Use immutable state updates (`map`, `filter`, spread operators) over direct mutations.
- Synchronize persistent client state (e.g., MBTI Quiz draft) with `localStorage` safely using SSR-aware hydration wrappers.

---

## 8. Verification & Pre-Commit Quality Checklist

Before submitting any pull request or declaring a task complete, verify that the following pass without warnings or errors:

```bash
# 1. Type Safety Check
npx tsc --noEmit

# 2. Linting & Formatting Check
npm run lint

# 3. Production Build Compilation Check
npm run build
```

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
