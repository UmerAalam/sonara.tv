import { trendingShows } from "../data/data";

const TrendingSection = () => {
  return (
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            Trending
          </p>
          <h3 class="text-2xl font-bold">Shows stealing the spotlight</h3>
        </div>
        <button class="text-xs font-bold uppercase tracking-[0.3em] text-[#ccff33]">
          View guide →
        </button>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        {trendingShows.map((show) => (
          <article class="group relative overflow-hidden rounded-3xl border border-white/5 bg-linear-to-b from-white/10 via-white/5 to-[#111] p-6">
            <div class="absolute inset-0 bg-linear-to-b from-[#ccff33]/5 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div class="relative">
              <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
                {show.category}
              </p>
              <h4 class="mt-3 text-xl font-bold text-white">{show.title}</h4>
              <p class="mt-6 text-sm font-semibold text-white/60">
                {show.time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
