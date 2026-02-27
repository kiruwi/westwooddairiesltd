export const productsStyles = {
  pageShell: "bg-[#c7d5f0] px-6 pb-32 pt-24 text-zinc-900 md:pb-40",
  main: "mx-auto w-full max-w-[1200px]",
  searchHeader: "mb-10 pt-20",
  searchWrap: "mx-auto max-w-xl",
  searchInput:
    "w-full rounded-full border border-[#c7d5f0]/40 bg-white px-6 py-3 text-base text-black placeholder:text-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d5f0]/40",
  contentGrid: "grid gap-8 lg:grid-cols-[1fr_3fr]",
  sidebar:
    "card rounded-3xl bg-white p-6 lg:sticky lg:top-24 lg:self-start",
  sidebarTitle:
    "text-5xl font-normal tracking-normal text-[#213864] font-title-italic",
  sidebarNav: "mt-5 grid gap-4 text-lg text-black",
  cartPill:
    "inline-flex items-center gap-2 rounded-full bg-[#213864] px-4 py-2 text-base font-semibold text-white font-paragraph",
  cartCount:
    "inline-flex min-w-[20px] items-center justify-center rounded-full bg-white px-2 text-sm font-semibold text-[#213864]",
  productsSection: "grid gap-6",
  productsHeadingWrap: "py-2",
  productsHeading:
    "text-5xl font-medium tracking-tight text-[#213864] font-title-italic",
  productsGrid: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  emptyState:
    "col-span-full rounded-3xl bg-white p-8 text-center text-lg text-black",
  card: "card rounded-3xl bg-white font-chewy",
  mediaWrap:
    "relative h-72 w-full overflow-hidden rounded-t-3xl rounded-b-[40px] bg-white",
  imageFallback:
    "flex h-full w-full flex-col items-center justify-center gap-2 text-black",
  comingSoonLabel: "text-xs font-semibold uppercase tracking-[0.3em]",
  comingSoonText: "text-sm font-semibold uppercase tracking-[0.2em]",
  cardBody: "rounded-b-3xl p-5",
  cardTitle: "text-2xl font-bold font-paragraph",
  cardDescription: "mt-3 font-paragraph text-lg leading-7",
  cardFooter: "mt-4 flex items-center justify-between gap-3",
  cardPrice: "px-1 text-sm font-semibold transition font-paragraph",
  counterWrap: "flex items-center gap-2",
  decrementButtonBase:
    "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition",
  decrementEnabled:
    "border-[#213864] text-[#213864] hover:bg-[#213864] hover:text-white",
  decrementDisabled: "border-black/20 text-black/30",
  quantity: "min-w-[24px] text-center text-base font-semibold text-[#213864] font-paragraph",
  incrementButton:
    "flex h-8 w-8 items-center justify-center rounded-full bg-[#213864] text-sm font-semibold text-white transition hover:bg-[#1a2f57]",
  suspenseShell: "bg-slate-50 px-6 pb-20 pt-24 text-zinc-900",
  suspenseMain: "mx-auto w-full max-w-[1200px]",
  suspensePulse: "h-40 animate-pulse bg-white",
} as const;
