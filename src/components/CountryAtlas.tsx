import { createMemo, createSignal } from "solid-js";
import { countries } from "../data/countries";

const CountryAtlas = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const countriesList = createMemo(() => {
    const term = searchTerm().toLowerCase();
    return countries.filter((country) =>
      country.label.toLowerCase().includes(term),
    );
  });
  return (
    <div class="space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/80 p-6 backdrop-blur">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          Country atlas
        </p>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex w-full items-center gap-3 rounded-2xl border px-4 py-3 transition border-white/10 bg-black/30 hover:border-white/40">
          <input
            type="text"
            placeholder="Search countries..."
            class="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
            onInput={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          ></svg>
        </div>
      </div>
      <div>
        {countriesList().map((country) => {
          return <div>{country.label}</div>;
        })}
      </div>
    </div>
  );
};

export default CountryAtlas;
