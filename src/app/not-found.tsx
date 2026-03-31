export default function NotFound() {
  return (
    <main className="mx-auto mt-20 w-full max-w-xl rounded-lg border border-border bg-surface p-6">
      <h1 className="font-display text-2xl font-bold text-accent">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        O recurso solicitado não existe ou foi movido.
      </p>
    </main>
  );
}
