import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-4 rounded-full border px-3 py-1 text-sm">
          Dia 5 — Frontend
        </span>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Catálogo de produtos
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Estrutura inicial do frontend criada com Next.js para integração com a
          API de produtos e carrinho.
        </p>

        <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-6 text-left shadow-sm">
            <h2 className="text-lg font-semibold">Próximos passos</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Implementar catálogo, busca, cards de produto e integração com o
              carrinho.
            </p>
          </div>

          <div className="rounded-2xl border p-6 text-left shadow-sm">
            <h2 className="text-lg font-semibold">Status</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Base do frontend pronta para começar o desenvolvimento visual.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
