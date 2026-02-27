import Link from "next/link";

export default function HomeStockistsSection() {
  return (
    <section
      id="stockists"
      className="bg-[#c7d5f0] px-6 py-12"
      data-reveal
      data-delay="240"
    >
      <h2 className="text-center text-5xl font-medium text-[#213864] sm:text-6xl font-title-italic">
        Stockists
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-black">
        Looking for Westwood Dairies near you? Share your location and we will guide you to a
        nearby stockist or deliver directly where available.
      </p>
      <div className="mx-auto mt-6 flex justify-center">
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center rounded-full bg-[#213864] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
        >
          Find a Stockist
        </Link>
      </div>
    </section>
  );
}
