import { featuredChannels } from "../data/data";

const FeaturedSection = () => {
  return (
    <section class="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
      <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-[#2a2a2a] via-[#161616] to-[#070707] p-8">
        <div class="absolute left-20 top-10 h-64 w-64 rounded-full bg-[#ccff33]/10 blur-3xl" />
        <div class="relative space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            Live UHD Grid
            <span class="inline-flex h-2 w-2 rounded-full bg-[#ccff33]" />
          </div>
          <div class="space-y-4">
            <p class="text-sm font-semibold text-white/70">
              Tonight on IPTV_APP
            </p>
            <h2 class="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Bold, electric,
              <br />
              completely bufferless.
            </h2>
          </div>
          <div class="flex flex-wrap gap-4">
            <button class="flex items-center gap-2 rounded-2xl bg-[#ccff33] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#101010] transition hover:bg-[#e5ff66]">
              Watch metro feed
              <span aria-hidden class="text-lg">
                ↗
              </span>
            </button>
            <button class="rounded-2xl border border-white/25 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-white/60 hover:text-white/80">
              Explore channels
            </button>
          </div>
          <div class="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Latency", value: "1.8s edge" },
              { label: "Live channels", value: "240+" },
              { label: "UHD ready", value: "Dolby Vision" },
            ].map((metric) => (
              <div
                class="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                aria-label={`${metric.label} ${metric.value}`}
              >
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {metric.label}
                </p>
                <p class="mt-2 text-xl font-bold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div class="space-y-4 rounded-3xl border border-white/10 bg-[#151515]/80 p-6 backdrop-blur">
        <p class="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          Featured signals
        </p>
        <div class="space-y-4">
          {featuredChannels.map((channel) => (
            <div class="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
              <div>
                <p class="text-lg font-bold text-white">{channel.name}</p>
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {channel.genre}
                </p>
              </div>
              <div class="text-right">
                <span
                  class={`inline-flex items-center rounded-full ${channel.accent} px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#050505]`}
                >
                  {channel.status}
                </span>
                <p class="mt-3 text-sm font-semibold text-white/80">
                  {channel.viewers} tuned in
                </p>
              </div>
            </div>
          ))}
        </div>
        <div class="rounded-2xl border border-dashed border-white/20 p-4 text-sm font-semibold text-white/70">
          Adaptive bitrate powered by TanStack Router navigation — hop channels
          without losing the stream.
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
