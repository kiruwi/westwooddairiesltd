import Image from "next/image";

export default function HomeContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate min-h-[70vh] overflow-hidden bg-white pb-24 md:min-h-[85vh] md:pb-32"
      data-reveal
      data-delay="500"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 scale-125 opacity-[0.05]"
        style={{
          backgroundColor: "#213864",
          WebkitMaskImage: "url('/images/Untitled-1milk-spash.svg')",
          maskImage: "url('/images/Untitled-1milk-spash.svg')",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <div className="relative z-10 px-6 py-14">
        <div className="pointer-events-none absolute left-2 top-2 hidden h-44 w-44 overflow-hidden rotate-[-8deg] lg:block">
          <Image
            src="/images/BLUEBERRY.webp"
            alt=""
            fill
            sizes="176px"
            className="object-contain"
          />
        </div>
        <div className="pointer-events-none absolute bottom-2 right-0 hidden h-48 w-48 overflow-hidden rotate-[8deg] lg:block">
          <Image
            src="/images/MANGO.webp"
            alt=""
            fill
            sizes="192px"
            className="object-contain"
          />
        </div>
        <div className="pointer-events-none absolute right-24 top-6 hidden h-36 w-36 overflow-hidden rotate-[12deg] lg:block">
          <Image
            src="/images/KEY LIME.webp"
            alt=""
            fill
            sizes="144px"
            className="object-contain"
          />
        </div>
        <div className="pointer-events-none absolute bottom-4 left-20 hidden h-40 w-40 overflow-hidden rotate-[-12deg] lg:block">
          <Image
            src="/images/MIXED BERRY.webp"
            alt=""
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>
        <div className="pointer-events-none absolute right-36 bottom-24 hidden h-32 w-32 overflow-hidden rotate-[4deg] lg:block">
          <Image
            src="/images/MANGO COCNUT.webp"
            alt=""
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
        <div className="card relative mx-auto max-w-2xl rounded-3xl bg-white p-8">
          <h2 className="text-3xl font-medium text-[#213864] font-title-italic">
            Send Us a Message
          </h2>
          <form className="mt-6 grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full rounded-full border border-[#c7d5f0]/30 px-4 py-3 text-sm"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              required
              className="w-full rounded-full border border-[#c7d5f0]/30 px-4 py-3 text-sm"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full rounded-3xl border border-[#c7d5f0]/30 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[#213864] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
