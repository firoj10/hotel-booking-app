

import SearchForm from "@/components/forms/SearchForm";

export default function Hero() {
  return (
    <section className="relative bg-primary text-white flex flex-col items-center justify-center h-[500px] px-8">
      <h1 className="text-5xl font-bold mb-6 text-center">
        Find your perfect stay
      </h1>
      <p className="mb-6 text-lg text-white/90 text-center">
        Search hotels, homes, and much more
      </p>
      <SearchForm />
    </section>
  );
}