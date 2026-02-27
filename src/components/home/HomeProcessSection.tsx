const processSteps = [
  {
    title: "Fresh Milk Collection",
    detail:
      "We collect milk from trusted local farmers and begin handling it the same day.",
  },
  {
    title: "Careful Preparation",
    detail:
      "Each product is prepared in clean, controlled conditions using simple methods.",
  },
  {
    title: "Cold Delivery",
    detail:
      "Orders are packed to stay fresh and delivered while cold across our service areas.",
  },
];

export default function HomeProcessSection() {
  return (
    <section id="process" className="bg-white px-6 py-12" data-reveal data-delay="220">
      <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
        Our Process
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-black">
        From farm intake to final delivery, we keep every step practical, clean and focused on
        freshness.
      </p>
      <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
        {processSteps.map((step, index) => (
          <article key={step.title} className="card rounded-2xl bg-[#c7d5f0] p-5">
            <p className="text-sm font-semibold tracking-[0.25em] text-[#213864]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-[#213864] font-paragraph">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-black">{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
