import { createMemo, createSignal } from "solid-js";
import { countries } from "../data/countries";

const CountryAtlas = () => {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [countriesCount, setCountriesCount] = createSignal(6);

  const countriesList = createMemo(() => {
    const term = searchTerm().toLowerCase();
    return countries.filter((country) =>
      country.label.toLowerCase().includes(term),
    );
  });
  const onSearch = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value);
  };
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
            onInput={(e) => onSearch(e)}
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
      <div class="space-y-3">
        {countriesList()
          .slice(0, countriesCount())
          .map((country) => {
            const isActive = false;
            return (
              <button
                type="button"
                class={`flex cursor-pointer w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-[#ccff33]/80 bg-white/10"
                    : "border-white/10 bg-black/30 hover:border-white/40"
                }`}
                aria-pressed={isActive}
              >
                <div>
                  <div class="flex items-center gap-2">
                    {isActive && (
                      <span class="inline-block h-2.5 w-2.5 rounded-full bg-[#ccff33]"></span>
                    )}
                    <p class="text-base font-bold text-white">
                      {country.label.replace(
                        /\s*(\([^)]*\)|\[[^\]]*\])\s*/g,
                        "",
                      )}
                    </p>
                  </div>
                  <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
                    {country.label}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-[#ccff33]">
                    {country.label}
                  </p>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
                    {country.label}
                  </p>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default CountryAtlas;
