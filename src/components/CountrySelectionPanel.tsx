import { createMemo, createSignal, type JSX } from "solid-js";
import type { CountryChannels } from "../data/streaming-grid";

interface CountrySelectionPanelProps {
  countries: CountryChannels[];
  activeCode?: string;
  onSelect: (code: string) => void;
}

function CountrySelectionPanel(props: CountrySelectionPanelProps): JSX.Element {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [visibleCount, setVisibleCount] = createSignal(6);

  const filteredCountries = createMemo(() => {
    const term = searchTerm().trim().toLowerCase();
    if (!term) return props.countries;

    return props.countries.filter((country) => {
      const haystack = `${country.label} ${country.code} ${country.description}`.toLowerCase();
      return haystack.includes(term);
    });
  });

  const orderedCountries = createMemo(() => {
    const list = filteredCountries();
    if (!list.length) return list;

    const activeIndex = list.findIndex(
      (country) => country.code.toLowerCase() === props.activeCode?.toLowerCase(),
    );

    if (activeIndex <= 0) return list;

    const reordered = list.slice();
    const [active] = reordered.splice(activeIndex, 1);
    return [active, ...reordered];
  });

  const onSearch = (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  return (
    <div class="space-y-5 rounded-3xl border border-white/10 bg-[#0f0f0f]/80 p-6 backdrop-blur">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            Countries
          </p>
          <p class="text-lg font-bold text-white">Switch region feeds</p>
        </div>
        <span class="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          {props.countries.length} stacks
        </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-white/40">
          <input
            type="text"
            placeholder="Search countries..."
            class="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
            onInput={onSearch}
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
        {orderedCountries()
          .slice(0, visibleCount())
          .map((country) => {
            const isActive =
              country.code.toLowerCase() === props.activeCode?.toLowerCase();
            const accent = country.accent;
            return (
              <button
                type="button"
                class={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "border-white/10 bg-black/30 hover:border-white/40"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: accent,
                        boxShadow: `0 10px 40px -18px ${accent}80, 0 0 0 1px ${accent}50`,
                      }
                    : undefined
                }
                aria-pressed={isActive}
                onClick={() => props.onSelect(country.code)}
              >
                <div>
                  <div class="flex items-center gap-2">
                    {isActive && (
                      <span
                        class="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: accent }}
                      ></span>
                    )}
                    <p class="text-base font-bold text-white">{country.label}</p>
                  </div>
                  <p class="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/40">
                    {country.description}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold" style={{ color: accent }}>
                    {country.code}
                  </p>
                  <p class="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
                    {country.channels.length} feeds
                  </p>
                </div>
              </button>
            );
          })}
        {orderedCountries().length === 0 && (
          <div class="rounded-2xl border border-white/10 bg-black/30 px-4 py-6 text-center text-sm font-semibold text-white/60">
            No countries match that search.
          </div>
        )}
        {orderedCountries().length > visibleCount() && (
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            class="flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white/60 transition hover:border-white/40 hover:text-white"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default CountrySelectionPanel;
