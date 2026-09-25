export default function ProfessionsLoading() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8" aria-busy="true">
      <div className="h-10 w-2/3 animate-pulse rounded-lg bg-[var(--color-surface)]" />
      <div className="h-28 animate-pulse rounded-3xl bg-[var(--color-surface)]" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]" />)}
      </div>
    </main>
  );
}
