"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="mx-auto mt-20 w-full max-w-xl rounded-lg border border-border bg-surface p-6">
      <h1 className="font-display text-2xl font-bold text-danger">
        Falha ao carregar a aplicação
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
      >
        Tentar novamente
      </button>
    </main>
  );
}
