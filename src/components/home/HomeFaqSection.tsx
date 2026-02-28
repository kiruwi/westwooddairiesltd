import type { HomeFaq } from "../../data/home";

type HomeFaqSectionProps = {
  faqs: HomeFaq[];
  openFaq: number | null;
  onToggleFaq: (index: number) => void;
};

export default function HomeFaqSection({
  faqs,
  openFaq,
  onToggleFaq,
}: HomeFaqSectionProps) {
  return (
    <section
      id="services"
      className="bg-[#c7d5f0] px-6 pt-12 pb-4"
      data-reveal
      data-delay="260"
    >
      <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
        Frequently Asked Questions
      </h2>
      <div id="payment-options" className="sr-only" aria-hidden="true" />
      <div className="mt-6 grid gap-3">
        {faqs.map((faq, index) => (
          <button
            key={faq.question}
            type="button"
            onClick={() => onToggleFaq(index)}
            aria-expanded={openFaq === index}
            className={`card w-full rounded-2xl p-4 text-left transition focus-visible:outline-none ${
              openFaq === index ? "bg-[#c7d5f0]" : "bg-white"
            }`}
          >
            <div className="grid w-full grid-cols-[50%_1fr] items-start gap-4">
              <span
                className={`text-lg font-semibold ${
                  openFaq === index ? "text-white" : "text-[#213864]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex w-full items-start justify-between gap-4 text-left text-lg font-semibold ${
                  openFaq === index ? "text-white" : "text-black"
                }`}
              >
                <span className="block">{faq.question}</span>
                <span>{openFaq === index ? "-" : "+"}</span>
              </span>
              {openFaq === index ? (
                <p className="col-start-2 text-sm text-black">{faq.answer}</p>
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
