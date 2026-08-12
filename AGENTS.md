# Engineering Guidelines for Profesia

## Next.js 15/16 Dynamic Routes Rule
In Next.js 15+, `params` and `searchParams` passed to page components, layouts, or route handlers are Promises.
Always await `params` and `searchParams` before accessing their properties:

```tsx
// Correct
export default async function Page({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  return <div>{slug}</div>;
}
```

## i18n & Client Components
- Use `useTranslations()` from `next-intl` in Client Components.
- Use `getTranslations()` from `next-intl/server` in Server Components.

## Styling
- Use Tailwind CSS v4 design tokens defined in `app/[locale]/globals.css`.
- Ensure dark mode support using `dark:` prefix.
