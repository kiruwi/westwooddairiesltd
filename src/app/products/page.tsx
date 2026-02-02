const products = [
  {
    id: "soft-serve",
    name: "Soft serve ice cream",
    description:
      "Smooth, airy, and ready for cones or cups, with a clean dairy finish that pairs perfectly with fruit, syrups, or toppings.",
    tone: "#fff4d6",
  },
  {
    id: "maziwa-lala",
    name: "Maziwa lala (fermented milk)",
    description:
      "Traditional cultured milk with a gentle tang, ideal for daily drinking or serving chilled alongside meals.",
    tone: "#e7f6ef",
  },
  {
    id: "yogurt",
    name: "Yogurt",
    description:
      "Creamy, high-protein yogurt crafted in small batches for a balanced flavor and a lush, spoonable texture.",
    tone: "#fde7f3",
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-slate-50 px-6 pb-20 pt-24 text-zinc-900">
      <main className="mx-auto w-full max-w-6xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-700/70">
            Westwood Dairies
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            All products
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600">
            Explore our core dairy range. Tap any product to view details or contact us to
            place an order.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_3fr]">
          <aside className="border border-zinc-200 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-900">
              Products
            </h2>
            <nav className="mt-5 grid gap-3 text-sm text-zinc-700">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`#${product.id}`}
                  className="border-l-2 border-transparent pl-3 transition hover:border-sky-700 hover:text-sky-800"
                >
                  {product.name}
                </a>
              ))}
              <a
                href="/#contact"
                className="mt-4 inline-flex items-center justify-center border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Order / Enquire
              </a>
            </nav>
          </aside>

          <section className="grid gap-6">
            {products.map((product) => (
              <article
                key={product.id}
                id={product.id}
                className="border border-zinc-200 bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-4 h-1 w-full" style={{ backgroundColor: product.tone }} />
                <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  {product.name}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                  {product.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center bg-sky-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-800"
                  >
                    Order / Enquire
                  </a>
                  <a
                    href="/#process"
                    className="inline-flex items-center justify-center border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
                  >
                    Our process
                  </a>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
