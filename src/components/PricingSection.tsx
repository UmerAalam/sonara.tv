import { packages } from "../data/data";

const PricingSection = () => {
  return (
    <section class="space-y-6">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            Plans
          </p>
          <h3 class="text-2xl font-bold">Three tuned packages</h3>
        </div>
        <span class="rounded-full border border-[#ccff33]/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#ccff33]">
          Cancel anytime
        </span>
      </div>
      <div class="grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            class={`flex flex-col gap-4 rounded-3xl border ${
              pkg.highlight
                ? "border-[#ccff33]/80 bg-[#111]"
                : "border-white/10 bg-[#151515]"
            } p-6`}
          >
            <div class="flex items-center justify-between">
              <h4 class="text-xl font-bold">{pkg.name}</h4>
              <p class="text-lg font-black text-[#ccff33]">{pkg.price}</p>
            </div>
            <ul class="space-y-3 text-sm font-semibold text-white/70">
              {pkg.perks.map((perk) => (
                <li class="flex items-center gap-3">
                  <span class="h-2 w-2 rounded-full bg-[#ccff33]" />
                  {perk}
                </li>
              ))}
            </ul>
            <button
              class={`mt-auto rounded-2xl border px-4 py-3 text-xs font-black uppercase tracking-[0.3em] ${
                pkg.highlight
                  ? "border-[#ccff33] bg-[#ccff33] text-[#101010]"
                  : "border-white/20 text-white hover:border-white/60"
              }`}
            >
              Select {pkg.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default PricingSection;
